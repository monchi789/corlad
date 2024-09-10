import React, { useState } from "react";
import { Categoria } from "../../../../interfaces/model/Categoria";
import { createCategoria } from "../../../../api/categoria.api";

interface AgregarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

export const AgregarCategoria: React.FC<AgregarCategoriaProps> = ({ isOpen, onClose, onCategoryAdded }) => {
  const [newCategoriaName, setNewCategoriaName] = useState('');

  const handleSubmit = async () => {
    if (newCategoriaName.trim() === '') {
      console.error("Debe ingresar un nombre para la categoría");
      return;
    }

    try {
      const newCategoryData: Omit<Categoria, 'id'> = {
        nombre_categoria: newCategoriaName
      };
      console.log(newCategoryData);
      await createCategoria(newCategoryData);
      onCategoryAdded();
      onClose();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
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
        <h2 className="text-2xl mb-4">Registrar nueva categoría</h2>
        <input
          type="text"
          placeholder="Nombre de la Categoría"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
          value={newCategoriaName}
          onChange={(e) => setNewCategoriaName(e.target.value)}
        />
        <button className="bg-[#007336] text-white py-2 px-4 rounded" onClick={handleSubmit}>Añadir categoría</button>
      </div>
    </div>
  );
};
