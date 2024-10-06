import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { getPopUps, createPopUps, updatePopUps } from '../../../../api/popup.api';
import { PopUp } from '../../../../interfaces/model/PopUp';
import { IoAdd, IoCloseSharp, IoPencil, IoTrash, IoExpand } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../components/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { EliminarPopUp } from './EliminarPopUp';
import { EditarPopUps } from './EditarPopUp';

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
        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 relative border-solid border-2 border-[#2A8B3D] shadow-custom rounded-xl overflow-hidden ${!checked ? 'bg-[#4E5E51]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className={`w-full h-48 object-cover rounded-lg ${!checked ? 'opacity-50' : ''}`} src={imagen} alt="imagen" />
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
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
      >
        <div className="relative z-50 p-4 bg-white rounded-lg shadow-lg">
          <img src={imagen} alt="Full size image" className="max-h-[80vh] max-w-[90vw] object-contain" />
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 text-xl cursor-pointer flex items-center justify-center"
          >
            <IoCloseSharp />
          </button>
        </div>
      </Modal>
    </>
  );
};

const AddModal: React.FC<{
  isOpen: boolean;
  isLoading: boolean
  onClose: () => void;
  onSave: (newImage: File) => void;
}> = ({ isOpen, isLoading, onClose, onSave }) => {
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (newImage) {
      onSave(newImage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Image"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
    >
      <div className="relative z-50 bg-white p-5 rounded-lg">
        <input type="file" onChange={handleImageChange} />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            {isLoading ? <Spinner /> : 'Guardar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default function PopUpsPage() {
  const navigate = useNavigate();

  const [listPopUps, setListPopUps] = useState<PopUp[]>([]);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [isPopUpUpdateModalOpen, setIsPopUpUpdateModalOpen] = useState(false);
  const [isPopUpDeleteModalOpen, setIsPopUpDeleteModalOpen] = useState(false);

  const [selectedPopUp, setSelectedPopUp] = useState<PopUp | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  const fetchPopUps = async () => {
    setIsLoading(true); // Activa el estado de carga

    try {
      const res = await getPopUps();
      setListPopUps(res.data);
    } catch (error) {
      toast.error('Error al cargar las categorias');
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  const handlePopUpSuccess = (success: boolean, godMessage: string, badMessage: string) => {
    if (success) {
      fetchPopUps();
      toast.success(godMessage);
    } else {
      toast.error(badMessage);
    }
  };

  const handleUpdatePopUp = (popup: PopUp) => {
    setSelectedPopUp(popup);
    setIsPopUpUpdateModalOpen(true);
  };

  const handleDeletePopUp = async (popup: PopUp) => {
    setSelectedPopUp(popup);
    setIsPopUpDeleteModalOpen(true);
  };

  const handleClosePopUpUpdateModal = () => {
    setIsPopUpUpdateModalOpen(false);
    setSelectedPopUp(null);
  };

  const handleClosePopUpDeleteModal = () => {
    setIsPopUpDeleteModalOpen(false);
    setSelectedPopUp(null);
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedList = listPopUps.map(popup => ({
        ...popup,
        estado_popup: checked && popup.id === id,
      }));

      setListPopUps(updatedList);

      await Promise.all(
        updatedList.map(popup =>
          updatePopUps(popup.id, { estado_popup: popup.estado_popup })
        )
      );

    } catch (error) {
      console.error('Error al actualizar el estado del anuncio:', error);
    }
  };

  const handleAdd = async (newImage: File) => {
    const formData = new FormData();
    formData.append('imagen', newImage);

    setIsLoading(true); // Comienza la carga antes de la solicitud

    try {
      await createPopUps(formData);
      fetchPopUps(); // Refresh the list
      setAddModalIsOpen(false);
    } catch (error) {
      toast.error('Error al agregar el anuncio');
      setAddModalIsOpen(false);
    } finally {
      setIsLoading(false); // Termina la carga después de la solicitud (tanto si es exitosa como si falla)
    }
  };

  useEffect(() => {
    fetchPopUps();
  }, []);

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
        <div className="flex flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-gray-900 p-2"
          >
            <FaArrowCircleLeft className="mr-2" size={"30px"} />
          </button>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Anuncios importantes</h4>
        </div>
      </div>
      <div className="text-default font-nunito font-bold my-5">
        <span>Bienvenido al panel de administración de anuncios, en este apartado se pueden crear anuncios importantes (máximo 5) que se quieran mostrar en la página web.</span>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-5">
        {listPopUps.map((popup, index) => (
          <Image
            key={index}
            id={popup.id}
            imagen={`${import.meta.env.VITE_API_URL_ALTER}${popup.imagen}`}
            estado_popup={popup.estado_popup}
            popup={popup}
            onStatusChange={handleStatusChange}
            onEdit={() => handleUpdatePopUp(popup)}
            onDelete={() => handleDeletePopUp(popup)}
          />
        ))}
        {listPopUps.length < 5 &&
          <button
            onClick={() => setAddModalIsOpen(true)}
            className="flex w-full sm:w-1/2 md:w-1/4 lg:w-1/6 h-48 bg-light items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl"
          >
            <div className="text-center text-default mx-auto my-auto">
              <IoAdd className="mx-auto mb-3" size={45} />
              <span className="text-2xl font-nunito font-extrabold">Nuevo anuncio</span>
            </div>
          </button>
        }
      </div>

      <AddModal
        isOpen={addModalIsOpen}
        isLoading={isLoading}
        onClose={() => setAddModalIsOpen(false)}
        onSave={handleAdd}
      />

      {selectedPopUp && (
        <EliminarPopUp
          isOpen={isPopUpDeleteModalOpen}
          onClose={handleClosePopUpDeleteModal}
          onPopUpDeleted={(success: boolean) => handlePopUpSuccess(success, "Anuncio eliminado con éxito", "Algo ha ocurrido al eliminar el anuncio")}
          popup={selectedPopUp}
        />
      )}

      {selectedPopUp && (
        <EditarPopUps
          isOpen={isPopUpUpdateModalOpen}
          onClose={handleClosePopUpUpdateModal}
          onPopUpUpdated={(success: boolean) => handlePopUpSuccess(success, "Anuncio actualizado con éxito", "Algo ha ocurrido al actualizar el anuncio")}
          popup={selectedPopUp}
        />
      )}

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>

  );
};
