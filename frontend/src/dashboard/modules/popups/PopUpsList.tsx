import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { EditePopUps, getPopUps, deletePopUps, createPopUps } from '../../../api/popup.api';
import { PopUp } from '../../../interfaces/model/PopUp';
import { IoAdd, IoCloseSharp, IoPencil, IoTrash, IoExpand } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../shared/Spinner';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

Modal.setAppElement('#root');

interface ImageProps {
  id: number;
  imagen?: string;
  estado_popup?: boolean;
  onStatusChange: (id: number, checked: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Image: React.FC<ImageProps> = ({ id, imagen, estado_popup, onStatusChange, onEdit, onDelete }) => {
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
                onDelete(id);
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

const EditModal: React.FC<{
  id: number;
  imagen: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, newImage: File) => void;
}> = ({ id, imagen, isOpen, onClose, onSave }) => {
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (newImage) {
      onSave(id, newImage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Image"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
    >
      <div className="relative z-50 bg-white p-5 rounded-lg">
        <img src={imagen} alt="Current image" className="max-h-[50vh] max-w-[50vw] mb-4" />
        <input type="file" onChange={handleImageChange} />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            Guardar
          </button>
        </div>
      </div>
    </Modal>
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

const ConfirmDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
    >
      <div className="relative z-50 bg-white p-5 rounded-lg text-center">
        <h2 className="text-xl mb-4">¿Estás seguro de que deseas eliminar este anuncio?</h2>
        <div className="flex justify-center">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const PopUpsList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<PopUp[]>([]);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedPopUp, setSelectedPopUp] = useState<PopUp | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  const fetchPopUps = async () => {
    try {
      const res = await getPopUps();
      setList(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de anuncios:', error);
    }
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedList = list.map(popup => ({
        ...popup,
        estado_popup: checked && popup.id === id,
      }));

      setList(updatedList);

      await Promise.all(
        updatedList.map(popup =>
          EditePopUps(popup.id, { estado_popup: popup.estado_popup })
        )
      );

    } catch (error) {
      console.error('Error al actualizar el estado del anuncio:', error);
    }
  };

  const handleEdit = (id: number) => {
    const popup = list.find(p => p.id === id);
    if (popup) {
      setSelectedPopUp(popup);
      setEditModalIsOpen(true);
    }
  };

  const handleSave = async (id: number, newImage: File) => {
    const formData = new FormData();
    formData.append('imagen', newImage);

    try {
      await EditePopUps(id, formData);
      fetchPopUps(); // Refresh the list
      setEditModalIsOpen(false);
    } catch (error) {
      toast.error('Error al guardar el anuncio');
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


  const handleDelete = async (id: number) => {
    try {
      await deletePopUps(id);
      setList(list.filter(popup => popup.id !== id));
      toast.success('Anuncio eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el anuncio:', error);
      toast.error('Error al eliminar el anuncio');
    }
  };

  const handleConfirmDelete = (id: number) => {
    const popup = list.find(p => p.id === id);
    if (popup) {
      setSelectedPopUp(popup);
      setDeleteModalIsOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedPopUp) {
      await handleDelete(selectedPopUp.id);
      setDeleteModalIsOpen(false);
    }
  };

  useEffect(() => {
    fetchPopUps();
  }, []);

  return (
    <div className="flex flex-col my-5 space-y-5">
      <div className="flex flex-row">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-gray-900 p-2"
        >
          <FaArrowCircleLeft className="mr-2" size={"30px"} />
        </button>
        <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Anuncios importantes</h4>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-5">
        {list.map((element, index) => (
          <Image
            key={index}
            id={element.id}
            imagen={`${import.meta.env.VITE_API_URL_ALTER}${element.imagen}`}
            estado_popup={element.estado_popup}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleConfirmDelete}
          />
        ))}
        {list.length < 5 &&
          <button
            onClick={() => setAddModalIsOpen(true)}
            className="flex w-full sm:w-1/2 md:w-1/4 lg:w-1/6 h-48 bg-[#FCFFDB] items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl"
          >
            <div className="mx-auto my-auto text-center">
              <IoAdd className="mx-auto mb-3" size={45} />
              <span className="text-2xl text-[#5F4102] font-nunito font-extrabold">Nuevo anuncio</span>
            </div>
          </button>
        }
      </div>

      {selectedPopUp && (
        <EditModal
          id={selectedPopUp.id}
          imagen={`${import.meta.env.VITE_API_URL_ALTER}${selectedPopUp.imagen}`}
          isOpen={editModalIsOpen}
          onClose={() => setEditModalIsOpen(false)}
          onSave={handleSave}
        />
      )}

      <AddModal
        isOpen={addModalIsOpen}
        isLoading={isLoading}
        onClose={() => setAddModalIsOpen(false)}
        onSave={handleAdd}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onConfirm={confirmDelete}
      />

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>

  );
};
