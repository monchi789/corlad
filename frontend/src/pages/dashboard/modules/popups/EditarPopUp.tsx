import React, { useState, useEffect } from "react";
import { updatePopUps } from "../../../../api/popup.api";
import { PopUp } from "../../../../interfaces/model/PopUp";
import Spinner from "../../components/ui/Spinner";

interface EditarPopUpsProps {
  isOpen: boolean;
  onClose: () => void;
  onPopUpUpdated: (success: boolean) => void;
  popup: PopUp;
}

export const EditarPopUps: React.FC<EditarPopUpsProps> = ({ isOpen, onClose, onPopUpUpdated, popup }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Vista previa de la imagen seleccionada

  useEffect(() => {
    if (popup) {
      setImagePreview(`${import.meta.env.VITE_API_URL_ALTER}${popup.imagen}`); // Mostrar la imagen actual
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
      onPopUpUpdated(true); // Notificación de éxito
      onClose();
    } catch (error) {
      onPopUpUpdated(false); // Notificación de error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Mostrar la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" aria-hidden="true"></div>
      <div
        className="relative w-full bg-[#ECF6E8] font-nunito rounded-lg max-w-xl z-10 mx-auto p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="absolute top-2 right-2 bg-[#007336] hover:bg-hover-corlad transition duration-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="flex flex-col">
          {/* Mostrar la imagen actual o la vista previa de la nueva imagen */}
          {imagePreview ? (
            <img src={imagePreview} alt="Vista previa" className=" mb-4" />
          ) : (
            <p>No se ha seleccionado ninguna imagen.</p>
          )}

          <input
            type="file"
            accept="image/*" // Solo permitir la carga de imágenes
            onChange={handleImageChange}
          />

          <div className="flex justify-end mt-4">
            <button 
            className="bg-gray-500 hover:bg-gray-600 transition duration-300 text-white rounded mr-2 px-4 py-2"
            onClick={onClose}
            >
              Cancelar
            </button>
            <button
            className={
              `bg-corlad text-white rounded px-4 py-2
            ${isSubmitting ? 'opacity-50' : 'hover:bg-hover-corlad transition duration-300'}`
            }
              onClick={() => onSubmit(popup.id)}
            >
              {isSubmitting ? <Spinner /> : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

