import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { EditePopUps, getPopUps, deletePopUps, createPopUps } from '../../../api/popup.api';
import { PopUp } from '../../../interfaces/model/PopUp';
import { IoAdd, IoCloseSharp, IoPencil, IoTrash, IoExpand } from "react-icons/io5";
import toast from 'react-hot-toast';

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
        className={`w-1/6 relative border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl overflow-hidden ${!checked ? 'bg-[#4E5E51]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className={`w-full h-48 object-cover rounded-lg ${!checked ? 'opacity-50' : ''}`} src={imagen} alt="imagen" />
        <div className='absolute top-0 right-0 m-3 z-50' onClick={(e) => e.stopPropagation()}>
          <Switch onChange={handleChange} checked={checked} />
        </div>
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold transition duration-200 rounded py-2 px-4 mr-2"
            >
              <IoExpand />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold transition duration-200 rounded py-2 px-4 mr-2"
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
        <div className="relative z-50">
          <img src={imagen} alt="Full size image" className="max-h-[90vh] max-w-[90vw]" />
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
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AddModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (newImage: File) => void;
}> = ({ isOpen, onClose, onSave }) => {
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
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            Save
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
        <h2 className="text-xl mb-4">¿Estás seguro de que deseas eliminar este pop-up?</h2>
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
  const [list, setList] = useState<PopUp[]>([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedPopUp, setSelectedPopUp] = useState<PopUp | null>(null);

  const fetchPopUps = async () => {
    try {
      const res = await getPopUps();
      setList(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de popups:', error);
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
      console.error('Error al actualizar el estado de los popups:', error);
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
      console.error('Error al guardar la imagen:', error);
    }
  };

  const handleAdd = async (newImage: File) => {
    const formData = new FormData();
    formData.append('imagen', newImage);

    try {
      await createPopUps(formData);
      fetchPopUps(); // Refresh the list
      setAddModalIsOpen(false);
    } catch (error) {
      console.error('Error al añadir el popup:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePopUps(id);
      setList(list.filter(popup => popup.id !== id));
      toast.success('Popup eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el popup:', error);
      toast.error('Error al eliminar el popup');
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
    <div className="flex flex-col mt-10 space-y-5">
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-extrabold">Pop Ups</h4>
      <div className="flex flex-row space-x-5">
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
        <button
          onClick={() => setAddModalIsOpen(true)}
          className="flex w-1/6 bg-[#FCFFDB] items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl"
        >
          <div className="mx-auto my-auto">
            <IoAdd className="mx-auto mb-3" size={45} />
            <span className="text-2xl text-[#5F4102] font-nunito font-extrabold mx-auto">Nuevo PopUp</span>
          </div>
        </button>
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
        onClose={() => setAddModalIsOpen(false)}
        onSave={handleAdd}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
