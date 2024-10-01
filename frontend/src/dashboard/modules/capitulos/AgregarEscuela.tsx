import React, { useState } from "react";
import { createEscuela } from "../../../api/escuela.api";
import { Escuela } from "../../../interfaces/model/Escuela";
import Spinner from "../../components/ui/Spinner";

interface AgregarEscuelaProps {
  isOpen: boolean;
  onClose: () => void;
  onSchoolAdded: () => void;
}

export const AgregarEscuela: React.FC<AgregarEscuelaProps> = ({ isOpen, onClose, onSchoolAdded }) => {
  const [newEscuelaName, setNewEscuelaName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar la carga

  const handleSubmit = async () => {
    setIsLoading(true); // Inicia el estado de carga
    try {
      const newSchoolData: Omit<Escuela, 'id'> = {
        nombre_escuela: newEscuelaName,
      };

      await createEscuela(newSchoolData);

      onSchoolAdded();
      onClose();
      setNewEscuelaName('')

    } catch (error) {

    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
          <button
            className="flex items-center justify-center absolute top-2 right-2 w-8 h-8 bg-[#007336] hover:bg-[#458050] text-white rounded-full transition duration-300"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl mb-4">Registrar nuevo capítulo</h2>
          <input
            type="text"
            placeholder="Nombre del capítulo"
            className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A]"
            value={newEscuelaName}
            onChange={(e) => setNewEscuelaName(e.target.value)}
          />
          <button
            className={`bg-[#007336] hover:bg-[#458050] text-white transition duration-300 rounded py-2 px-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading} // Deshabilita el botón mientras está cargando
          >
            {isLoading ? <Spinner/> : 'Agregar capítulo'}
          </button>
        </div>
      </div>
    </>
  );
};
