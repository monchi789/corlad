import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { IoCloudUpload, IoClose, IoImage } from 'react-icons/io5';

interface AddPopUpModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (newImage: File) => void;
}

const AddPopUpModal: React.FC<AddPopUpModalProps> = ({ isOpen, isLoading, onClose, onSave }) => {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setNewImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (newImage) {
      onSave(newImage);
      clearImage()
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Image"
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] transition-all duration-300"
    >
      <div className="relative z-50 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Agregar nuevo anuncio</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`relative group border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />

          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-[600px] object-contain rounded-lg"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <IoCloudUpload className="w-16 h-16 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
              <p className="mt-4 text-lg font-medium text-gray-700">
                Arrastra una imagen o haz clic para seleccionar
              </p>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG o WEBP (máximo 5MB)
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end items-center space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!newImage || isLoading}
            className={`px-6 py-2.5 rounded-lg text-white font-medium flex items-center space-x-2 
              ${!newImage || isLoading
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
              <>
                <IoImage className="w-5 h-5" />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPopUpModal;
