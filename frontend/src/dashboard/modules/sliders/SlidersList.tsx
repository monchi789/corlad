import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Modal from 'react-modal';
import { Slider } from '../../../interfaces/model/Slider';
import { createSlider, deleteSlider, editSlider, getSlider } from '../../../api/slider.api';
import { IoExpand, IoCloseSharp, IoArrowBack, IoArrowForward, IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');

interface ImageProps {
  id: number;
  imagenes: string[];
  estado_slider: boolean;
  onStatusChange: (id: number, checked: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Image: React.FC<ImageProps> = ({ id, imagenes, estado_slider, onStatusChange, onEdit, onDelete }) => {
  const [checked, setChecked] = useState(estado_slider ?? false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = async (checked: boolean) => {
    setChecked(checked);
    onStatusChange(id, checked);
  };

  useEffect(() => {
    setChecked(estado_slider ?? false);
  }, [estado_slider]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  const renderImageContent = () => {
    if (imagenes.length === 0) {
      return <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">No hay imágenes</div>;
    } else {
      return <img className={`w-full h-48 object-cover rounded-lg ${!checked ? 'opacity-50' : ''}`} src={imagenes[0]} alt="imagen" />;
    }
  };

  return (
    <>
      <div
  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/6 relative border-solid border-2 border-[#2A8B3D] shadow-custom rounded-xl overflow-hidden ${!checked ? 'bg-[#4E5E51]' : ''}`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {renderImageContent()}
  <div className="absolute top-0 right-0 m-3 z-30" onClick={(e) => e.stopPropagation()}>
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
  contentLabel="Image Gallery"
  className="fixed inset-0 flex items-center justify-center z-[1000]"
  overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
>
  <div className="relative z-50 bg-white p-5 rounded-lg max-w-[90vw] max-h-[90vh]">
    {imagenes.length > 0 ? (
      <>
        <img src={imagenes[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="max-h-[80vh] max-w-[80vw]" />
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 text-xl cursor-pointer flex items-center justify-center"
        >
          <IoCloseSharp />
        </button>
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center"
        >
          <IoArrowBack />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center"
        >
          <IoArrowForward />
        </button>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full">
          {currentImageIndex + 1} / {imagenes.length}
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-full w-full bg-gray-100">
        <span>No hay imágenes</span>
      </div>
    )}
  </div>
</Modal>

    </>
  );
};

const AddModal: React.FC<{
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (newImages: File[]) => void;
}> = ({ isOpen, isLoading, onClose, onSave }) => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + newImages.length > 4) {
        alert("Puedes seleccionar hasta 4 imágenes.");
        return;
      }
      const updatedImages = [...newImages, ...files];
      if (updatedImages.length > 4) {
        alert("Solo puedes tener hasta 4 imágenes en total.");
        return;
      }
      setNewImages(updatedImages);

      // Generate previews for the selected images
      const previews = updatedImages.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const handleAddImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleImageChange({ target } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };
    input.click();
  };

  // Guardar las imagenes
  const handleSave = () => {
    if (newImages.length > 0) {
      onSave(newImages);

      setNewImages([]);
      setPreviewImages([]);
    }
  };

  const handleCancel = () => {
    onClose();
    setNewImages([]);
    setPreviewImages([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      contentLabel="Add Images"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
    >
      <div className="relative z-50 bg-white p-5 rounded-lg">
        <button
          onClick={handleAddImages}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Agregar Imágenes
        </button>
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  onClick={() => {
                    setPreviewImages(prev => prev.filter((_, i) => i !== index));
                    setNewImages(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-1 right-1 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <IoCloseSharp />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={handleCancel} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
            {isLoading ? 'Guardando...' : 'Guardar'}
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
        <h2 className="text-xl mb-4">¿Estás seguro de que deseas eliminar esta galería?</h2>
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

const EditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slider: Slider;
  onSave: (id: number, updatedSlider: FormData) => void;
}> = ({ isOpen, onClose, slider, onSave }) => {
  const [images, setImages] = useState<(File | string | null)[]>([null, null, null, null]);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([null, null, null, null]);

  useEffect(() => {
    if (slider) {
      const existingImages = [
        slider.imagen_1,
        slider.imagen_2,
        slider.imagen_3,
        slider.imagen_4,
      ];
      setImages(existingImages);
      setPreviewImages(existingImages.map(img =>
        img ? `${import.meta.env.VITE_API_URL_ALTER}${img}` : null
      ));
    }
  }, [slider]);

  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];

    if (file) {
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
    } else {
      newImages[index] = null;
      newPreviews[index] = null;
    }

    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const handleImageUpload = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        handleImageChange(index, target.files[0]);
      }
    };
    input.click();
  };

  const handleSave = () => {
    const formData = new FormData();

    images.forEach((image, index) => {
        if (image instanceof File) {
            formData.append(`imagen_${index + 1}`, image);
        } else if (image === null) {
            formData.append(`imagen_${index + 1}`, ""); // Enviar "null" para eliminar la imagen
        }
    });

    onSave(slider.id, formData);
    onClose();
};

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages[index] = null;
    newPreviews[index] = null;
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Images"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[1000]"
    >
      <div className="relative z-50 bg-white p-5 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Editar Imágenes del Slider</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => handleImageUpload(index)}
                className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {previewImages[index] ? 'Cambiar' : 'Subir'} Imagen {index + 1}
              </button>
              {previewImages[index] && (
                <div className="relative">
                  <img
                    src={previewImages[index] || undefined}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const SlidersList = () => {
  const [list, setList] = useState<Slider[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  const fetchSlider = async () => {
    try {
      const res = await getSlider();
      setList(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de galerías:', error);
    }
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedList = list.map(slider => ({
        ...slider,
        estado_slider: checked && slider.id === id,
      }));

      setList(updatedList);

      await Promise.all(
        updatedList.map(slider =>
          editSlider(slider.id, { estado_slider: slider.estado_slider })
        )
      );

    } catch (error) {
      console.error('Error al actualizar el estado de las galerías:', error);
    }
  };

  const handleEdit = (id: number) => {
    const slider = list.find(slider => slider.id === id);

    if (slider) {
      setSelectedSlider(slider);
      setIsEditModalOpen(true);
    } else {
      toast.error('Error al encontrar la galería');
    }
  };

  const handleSaveEdit = async (id: number, formData: FormData) => {
    try {
      await editSlider(id, formData);
      fetchSlider();
      setIsEditModalOpen(false);
      toast.success('Galería actualizada con éxito');
    } catch (error) {
      toast.error('Error actualizando la galería');
    }
  };

  const handleAdd = async (newImages: File[]) => {
    const formData = new FormData();
    newImages.forEach((image, index) => {
      formData.append(`imagen_${index + 1}`, image);
    });

    setIsLoading(true); // Comienza la carga antes de la solicitud

    try {
      await createSlider(formData);
      fetchSlider(); // Refresh the list
      setAddModalIsOpen(false);
    } catch (error) {
      toast.error('Error al agregar la galería');
    }finally {
      setIsLoading(false); // Termina la carga después de la solicitud (tanto si es exitosa como si falla)
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSlider(id);
      setList(list.filter(slider => slider.id !== id));
      toast.success('Slider eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el slider:', error);
      toast.error('Error al eliminar el slider');
    }
  };

  const handleConfirmDelete = (id: number) => {
    const slider = list.find(p => p.id === id);
    if (slider) {
      setSelectedSlider(slider);
      setDeleteModalIsOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedSlider) {
      await handleDelete(selectedSlider.id);
      setDeleteModalIsOpen(false);
    }
  };

  useEffect(() => {
    fetchSlider()
  }, []);

  return (
    <div className="flex flex-col mt-10 space-y-5">
  <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold">Galerías de fotos</h4>
  <div className="flex flex-wrap gap-3">
    {list.map((element, index) => {
      // Filtrar imágenes nulas o vacías
      const filteredImages = [
        element.imagen_1,
        element.imagen_2,
        element.imagen_3,
        element.imagen_4
      ].filter(image => image !== null && image.trim() !== '');

      return (
        <Image
          key={index}
          id={element.id}
          imagenes={filteredImages.map(img => `${import.meta.env.VITE_API_URL_ALTER}${img}`)}
          estado_slider={element.estado_slider}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleConfirmDelete}
        />
      );
    })}
    {list.length < 5 &&
    <button
      onClick={() => setAddModalIsOpen(true)}
      className="flex w-full sm:w-1/3 md:w-1/4 lg:w-1/6 h-48 bg-[#FCFFDB] items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl p-4"
    >
      <div className="mx-auto my-auto text-center">
        <IoAdd className="mx-auto mb-3" size={45} />
        <span className="text-2xl text-[#5F4102] font-nunito font-extrabold mx-auto">Nueva galería</span>
      </div>
    </button>
    }
  </div>

  {selectedSlider && (
    <EditModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      slider={selectedSlider}
      onSave={handleSaveEdit}
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