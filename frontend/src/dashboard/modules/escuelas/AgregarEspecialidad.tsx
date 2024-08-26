import React, { useState, useEffect } from "react";
import { Escuela } from "../../../interfaces/model/Escuela";
import { getAllEscuelas, createEspecialidad } from "../../../api/escuela.api";
import { Especialidad } from "../../../interfaces/model/Especialidad";

interface AgregarEspecialidadProps {
  isOpen: boolean;
  onClose: () => void;
  onSpecialtyAdded: () => void;
}

export const AgregarEspecialidad: React.FC<AgregarEspecialidadProps> = ({ isOpen, onClose, onSpecialtyAdded }) => {
  const [newEspecialidadName, setNewEspecialidadName] = useState('');
  const [selectedEscuelaId, setSelectedEscuelaId] = useState<number | null>(null);
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);

  useEffect(() => {
    async function fetchEscuelas() {
      try {
        const escuelasRes = await getAllEscuelas();
        setEscuelasList(escuelasRes.data as Escuela[]);
      } catch (error) {
      }
    }
    fetchEscuelas();
  }, [escuelasList]);

  const handleSubmit = async () => {
    if (selectedEscuelaId === null) {
      return;
    }

    try {
      const selectedEscuela = escuelasList.find(escuela => escuela.id === selectedEscuelaId);
      if (!selectedEscuela) {
        console.error("Escuela seleccionada no encontrada");
        return;
      }

      const newSpecialtyData: Omit<Especialidad, 'id'> = {
        nombre_especialidad: newEspecialidadName,
        id_escuela: selectedEscuela,
      };
      await createEspecialidad(newSpecialtyData);
      onSpecialtyAdded();
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
        <h2 className="text-2xl mb-4">Registrar nueva especialidad</h2>
        <input
          type="text"
          placeholder="Nombre de la Especialidad"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
          value={newEspecialidadName}
          onChange={(e) => setNewEspecialidadName(e.target.value)}
        />
        <div className="mb-4">
          <label className="block mb-2">Capítulo</label>
          <select
            className="w-full p-2 border rounded shadow-lg border-[#00330A]"
            value={selectedEscuelaId ?? ''}
            onChange={(e) => setSelectedEscuelaId(parseInt(e.target.value))}
          >
            <option value="" disabled>Selecciona una escuela</option>
            {escuelasList.map((escuela) => (
              <option key={escuela.id} value={escuela.id}>{escuela.nombre_escuela}</option>
            ))}
          </select>
        </div>
        <button className="bg-[#007336] text-white py-2 px-4 rounded" onClick={handleSubmit}>Añadir especialidad</button>
      </div>
    </div>
  );
};
