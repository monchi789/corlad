import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoClose, IoCloudUpload } from 'react-icons/io5';

interface AddSliderModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (newImages: File[]) => void;
}

const AddSliderModal: React.FC<AddSliderModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onSave
}) => {
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

      // Generate previews
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

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
    const previews = updatedImages.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

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

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Image"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] transition-all duration-300"
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleCancel}
      />

      <div className="relative bg-white rounded-lg w-full max-w-lg p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Agregar imágenes
          </h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {previewImages.length > 0 ? (
          <div 
          className={`grid grid-cols-2 gap-4 border-2 border-dashed rounded-xl p-8 transition-all duration-200 mb-4 ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          >
            {previewImages.map((src, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setPreviewImages(prev => prev.filter((_, i) => i !== index));
                    setNewImages(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <IoClose className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={handleAddImages}
            className="flex flex-col items-center justify-center p-8 mb-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
          >
            <IoCloudUpload className="w-16 h-16 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
            <p className="mt-4 text-lg font-medium text-gray-700">
              Arrastra las imagenes o haz clic para seleccionar
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Máximo 4 imágenes (máximo 20MB)
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || newImages.length === 0}
            className={`px-6 py-2.5 rounded-lg text-white font-medium flex items-center space-x-2 
              ${!newImages.length || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-best-green hover:bg-green-600 transition-colors duration-200'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </>
            ) : (
              'Guardar'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSliderModal;
