import React, { useState } from "react";
import { Categoria } from "../../../interfaces/model/Categoria";
import { createCategoria } from "../../../api/categoria.api";
import Spinner from "../../components/ui/Spinner";

interface AgregarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (success:boolean) => void;
}

export const AgregarCategoria: React.FC<AgregarCategoriaProps> = ({ isOpen, onClose, onCategoryAdded }) => {
  const [newCategoriaName, setNewCategoriaName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {

    setIsSubmitting(true);

    try {
      const newCategoryData: Omit<Categoria, 'id'> = {
        nombre_categoria: newCategoriaName
      };
      await createCategoria(newCategoryData);
      onCategoryAdded(true); // Notificación de exito
      setNewCategoriaName('');
      onClose();
    } catch (error) {
      onCategoryAdded(false); // Notificación de exito
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" aria-hidden="true"></div>
      <div
        className="relative w-full bg-[#ECF6E8] font-nunito rounded-lg max-w-md z-10 mx-auto p-6"
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
          <span className="text-2xl font-bold mb-4">Registrar nueva categoría</span>
          <input
            type="text"
            placeholder="Nombre de la Categoría"
            className="w-full p-2 border rounded mb-2 shadow-lg border-[#00330A] focus:outline-[#007336]"
            value={newCategoriaName}
            onChange={(e) => setNewCategoriaName(e.target.value)}
          />
          <button
            className={
              `flex justify-center bg-corlad text-white rounded py-2 px-4 mt-2 ms-auto
            ${isSubmitting || newCategoriaName.trim() === '' ? 'opacity-50' : 'hover:bg-hover-corlad transition duration-300'}`
            }
            onClick={handleSubmit}
            disabled={isSubmitting || newCategoriaName.trim() === ''}
          >
            {isSubmitting ? <Spinner /> : 'Guardar categoría'}
          </button>
        </div>
      </div>
    </div>
  );
};
