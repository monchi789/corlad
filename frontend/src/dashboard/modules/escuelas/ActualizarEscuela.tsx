import React, { useState, useEffect } from "react";
import { updateEscuela } from "../../../api/escuela.api";
import { Escuela } from "../../../interfaces/model/Escuela";

interface ActualizarEscuelaProps {
  isOpen: boolean;
  onClose: () => void;
  onSchoolUpdated: () => void;
  escuela: Escuela;
}

export const ActualizarEscuela: React.FC<ActualizarEscuelaProps> = ({ isOpen, onClose, onSchoolUpdated, escuela }) => {
  const [schoolName, setSchoolName] = useState('');

  useEffect(() => {
    if (escuela) {
      setSchoolName(escuela.nombre_escuela);
    }
  }, [escuela]);

  const handleSubmit = async () => {
    try {
      const updatedSchoolData: Partial<Escuela> = {
        nombre_escuela: schoolName,
      };

      await updateEscuela(escuela.id, updatedSchoolData);

      onSchoolUpdated();
      onClose();
    } catch (error) {
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
        <h2 className="text-2xl mb-4">Editar capítulo</h2>
        <input
          type="text"
          placeholder="Nombre de la Escuela"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <button className="bg-[#007336] text-white py-2 px-4 rounded" onClick={handleSubmit}>Guardar cambios</button>
      </div>
    </div>
  );
};
