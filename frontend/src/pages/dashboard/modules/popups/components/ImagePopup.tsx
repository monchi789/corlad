import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { IoCloseSharp, IoPencil, IoTrash, IoExpand } from "react-icons/io5";
import { PopUp } from '../../../../../interfaces/model/PopUp';

Modal.setAppElement('#root');

interface ImageProps {
  id: number;
  imagen?: string;
  estado_popup?: boolean;
  popup: PopUp;
  onStatusChange: (id: number, checked: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (popup: PopUp) => void;
}

const Image: React.FC<ImageProps> = ({ id, imagen, estado_popup, popup, onStatusChange, onEdit, onDelete }) => {
  const [checked, setChecked] = useState(estado_popup ?? false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = async (checked: boolean) => {
    setChecked(checked);
    onStatusChange(id, checked);
  };

  useEffect(() => {
    setChecked(estado_popup ?? false);
  }, [estado_popup]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <div
        className={`w-60 relative border-solid border-2 border-[#2A8B3D] shadow-custom rounded-xl overflow-hidden ${!checked ? 'bg-[#4E5E51]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className={`w-60 h-48 object-cover rounded-lg ${!checked ? 'opacity-50' : ''}`} src={imagen} alt="imagen" />
        <div className="absolute top-0 right-0 m-3 z-30" onClick={(e) => e.stopPropagation()}>
          <Switch onChange={handleChange} checked={checked} />
        </div>
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold transition duration-200 rounded py-2 px-4"
            >
              <IoExpand />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold transition duration-200 rounded py-2 px-4"
            >
              <IoPencil />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(popup);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold transition duration-200 rounded py-2 px-4"
            >
              <IoTrash />
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        className="fixed inset-0 flex items-center justify-center z-[1000]"
        overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm z-[1000] transition-all duration-300"
      >
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
          <div
            className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header with gradient */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-black/20 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-200" />
                  <IoCloseSharp className="relative w-8 h-8" />
                </div>
              </button>
            </div>

            <div className="relative">
              <img
                src={imagen}
                alt="Vista ampliada"
                className="max-h-[85vh] max-w-[95vw] md:max-w-[85vw] object-contain transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default Image;
