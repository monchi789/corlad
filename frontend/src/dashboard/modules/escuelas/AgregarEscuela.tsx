import React, { useState } from "react";

interface AgregarEscuelaProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgregarEscuela: React.FC<AgregarEscuelaProps> = ({ isOpen, onClose }) => {
  const [newSchoolName, setNewSchoolName] = useState('');

  const handleSubmit = () => {
    // Lógica para agregar una nueva escuela
    console.log('Nombre de la nueva escuela:', newSchoolName);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 relative z-10 w-full max-w-md mx-auto">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>✕</button>
        <h2 className="text-2xl mb-4">Registrar nueva escuela</h2>
        <input
          type="text"
          placeholder="Nombre de la Escuela"
          className="w-full p-2 border rounded mb-4"
          value={newSchoolName}
          onChange={(e) => setNewSchoolName(e.target.value)}
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>Añadir escuela</button>
      </div>
    </div>
  );
};
