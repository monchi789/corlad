import React, { useState } from "react";
import { Categoria } from "../../../../interfaces/model/Categoria";
import { deleteCategoria } from "../../../../api/categoria.api";
import Spinner from "../../components/ui/Spinner";

interface EliminarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryDeleted: (success: boolean) => void;
  categoria: Categoria;
}

export const EliminarCategoria: React.FC<EliminarCategoriaProps> = ({ isOpen, onClose, onCategoryDeleted, categoria }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {

    setIsLoading(true);

    try {
      await deleteCategoria(categoria.id);
      onCategoryDeleted(true); // Notificación de exito
      onClose();
    } catch (error) {
      onCategoryDeleted(false); // Notificación de error
    } finally {
      setIsLoading(false);
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
          <span className="text-2xl font-bold mb-4">Eliminar categoria '{categoria.nombre_categoria}'</span>
          <p>¿Está seguro de que desea eliminar esta categoría?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? <Spinner color="border-red-800"/> : 'Eliminar categoría'}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
