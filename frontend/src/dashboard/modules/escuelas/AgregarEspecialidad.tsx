import React, { useState, useEffect } from "react";
import { Escuela } from "../../../interfaces/model/Escuela";
import { getAllEscuelas } from "../../../api/escuela.api";

interface AgregarEspecialidadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgregarEspecialidad: React.FC<AgregarEspecialidadProps> = ({ isOpen, onClose }) => {
  const [newEspecialidadName, setNewEspecialidadName] = useState('');
  const [selectedEscuela, setSelectedEscuela] = useState('');
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);

  useEffect(() => {
    async function fetchEscuelas() {
      try {
        const escuelasRes = await getAllEscuelas();
        setEscuelasList(escuelasRes.data as Escuela[]);
      } catch (error) {
        console.error("Error al cargar las escuelas:", error);
      }
    }
    fetchEscuelas();
  }, []);

  const handleSubmit = () => {
    // Lógica para agregar una nueva especialidad
    console.log('Nombre de la nueva especialidad:', newEspecialidadName);
    console.log('Escuela seleccionada:', selectedEscuela);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 relative z-10 w-full max-w-md mx-auto">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>✕</button>
        <h2 className="text-2xl mb-4">Registrar nueva especialidad</h2>
        <input
          type="text"
          placeholder="Nombre de la Especialidad"
          className="w-full p-2 border rounded mb-4"
          value={newEspecialidadName}
          onChange={(e) => setNewEspecialidadName(e.target.value)}
        />
        <div className="mb-4">
          <label className="block mb-2">Capítulo</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedEscuela}
            onChange={(e) => setSelectedEscuela(e.target.value)}
          >
            <option value="" disabled>Selecciona una escuela</option>
            {escuelasList.map((escuela) => (
              <option key={escuela.id} value={escuela.id}>{escuela.nombre_escuela}</option>
            ))}
          </select>
        </div>
        <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>Añadir especialidad</button>
      </div>
    </div>
  );
};
