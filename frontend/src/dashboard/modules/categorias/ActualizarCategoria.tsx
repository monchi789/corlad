import React, { useState, useEffect } from "react";
import { updateCategoria } from "../../../api/categoria.api";
import { Categoria } from "../../../interfaces/model/Categoria";
import Spinner from "../../components/ui/Spinner";

interface ActualizarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryUpdated: (success:boolean) => void;
  categoria: Categoria;
}

export const ActualizarCategoria: React.FC<ActualizarCategoriaProps> = ({ isOpen, onClose, onCategoryUpdated, categoria }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (categoria) {
      setCategoryName(categoria.nombre_categoria);
    }
  }, [categoria]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const CategoryData: Omit<Categoria, 'id'> = {
        nombre_categoria: categoryName
      };
      await updateCategoria(categoria.id, CategoryData);
      onCategoryUpdated(true); // Notificación de exito
      setCategoryName('');
      onClose();
    } catch (error) {
      onCategoryUpdated(false); // Notificación de exito
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
          <span className="text-2xl font-bold mb-4">Editar categoria '{categoria.nombre_categoria}'</span>
          <input
            type="text"
            placeholder="Nombre de la Categoría"
            className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            className={
              `flex justify-center bg-corlad text-white rounded py-2 px-4 mt-2 me-auto
            ${isSubmitting || categoryName.trim() === '' ? 'opacity-50' : 'hover:bg-hover-corlad transition duration-300'}`
            }
            onClick={handleSubmit}
            disabled={isSubmitting || categoryName.trim() === ''}
          >
            {isSubmitting ? <Spinner /> : 'Guardar cambios'}
          </button>          
          <div />
        </div>
      </div>
    </div>
  );
};
