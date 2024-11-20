import React, { useState, useEffect, useRef } from "react";
import { IoCloudUpload, IoClose, IoSave } from 'react-icons/io5';
import { updatePopUps } from "../../../../../api/popup.api";
import { PopUp } from "../../../../../interfaces/model/PopUp";

interface EditarPopUpsProps {
  isOpen: boolean;
  onClose: () => void;
  onPopUpUpdated: (success: boolean) => void;
  popup: PopUp;
}

export const EditarPopUps: React.FC<EditarPopUpsProps> = ({ 
  isOpen, 
  onClose, 
  onPopUpUpdated, 
  popup 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (popup) {
      setImagePreview(`${import.meta.env.VITE_API_URL_ALTER}${popup.imagen}`);
    }
  }, [popup]);

  const onSubmit = async (id: number) => {
    setIsSubmitting(true);
    const formData = new FormData();
    if (newImage) {
      formData.append('imagen', newImage);
    }

    try {
      await updatePopUps(id, formData);
      onPopUpUpdated(true);
      onClose();
    } catch (error) {
      onPopUpUpdated(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setNewImage(null);
    setImagePreview(`${import.meta.env.VITE_API_URL_ALTER}${popup.imagen}`);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Editar anuncio</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`relative group border-2 border-dashed rounded-xl transition-all duration-200 ${
              isDragging
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-full h-[600px] object-contain p-2"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <IoCloudUpload className="w-6 h-6 text-gray-700" />
                    </button>
                    {newImage && (
                      <button
                        onClick={resetImage}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                        <IoClose className="w-6 h-6 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center p-8 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <IoCloudUpload className="w-16 h-16 text-gray-400" />
                <p className="mt-4 text-lg font-medium text-gray-700">
                  Arrastra una imagen o haz clic para seleccionar
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  PNG, JPG o GIF (máximo 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSubmit(popup.id)}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-best-green rounded-lg text-white font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <IoSave className="w-5 h-5" />
                  <span>Guardar cambios</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
