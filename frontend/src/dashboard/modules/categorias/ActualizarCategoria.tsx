import React, { useState, useEffect } from "react";
import { updateCategoria } from "../../../api/categoria.api";
import { Categoria } from "../../../interfaces/model/Categoria";

interface ActualizarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryUpdated: () => void;
  categoria: Categoria;
}

export const ActualizarCategoria: React.FC<ActualizarCategoriaProps> = ({ isOpen, onClose, onCategoryUpdated, categoria }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (categoria) {
      setCategoryName(categoria.nombre_categoria);
    }
  }, [categoria]);

  const handleSubmit = async () => {
    try {
      const updatedCategoryData = {
        nombre_categoria: categoryName,
      };

      await updateCategoria(categoria.id, updatedCategoryData);
      console.log('Categoría actualizada exitosamente');
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
        <button
          className="absolute top-2 right-2 bg-[#007336] text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl mb-4">Editar Categoría</h2>
        <input
          type="text"
          placeholder="Nombre de la Categoría"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="bg-[#007336] text-white py-2 px-4 rounded" onClick={handleSubmit}>Guardar cambios</button>
      </div>
    </div>
  );
};
