import React, { useState } from "react";
import { Escuela } from "../../../../interfaces/model/Escuela";
import { getAllEscuelas, createEspecialidad } from "../../../../api/escuela.api";
import { Especialidad } from "../../../../interfaces/model/Especialidad";
import Spinner from "../../components/ui/Spinner";

interface AgregarEspecialidadProps {
  isOpen: boolean;
  onClose: () => void;
  onSpecialtyAdded: () => void;
}

export const AgregarEspecialidad: React.FC<AgregarEspecialidadProps> = ({ isOpen, onClose, onSpecialtyAdded }) => {
  const [newEspecialidadName, setNewEspecialidadName] = useState('');
  const [selectedEscuelaId, setSelectedEscuelaId] = useState<number | null>(null);
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);
  const [loadingSelect, setLoadingSelect] = useState(false); // Nuevo estado para gestionar la carga
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar la carga

  const fetchEscuelas = async () => {
    setLoadingSelect(true); // Comienza la carga
    try {
      const escuelasRes = await getAllEscuelas();
      setEscuelasList(escuelasRes.data as Escuela[]);
    } catch (error) {
      console.error("Error fetching escuelas:", error);
    } finally {
      setLoadingSelect(false); // Finaliza la carga
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Inicia el estado de carga

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

      // Actualizar lista de escuelas después de agregar la especialidad
      await fetchEscuelas();

      onSpecialtyAdded(); // Callback para indicar que se añadió una especialidad
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error creating especialidad:", error);
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
        <button
          className="flex items-center justify-center absolute top-2 right-2 w-8 h-8 bg-[#007336] hover:bg-[#458050] text-white transition duration-300 rounded-full"
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
            onFocus={fetchEscuelas} // Ejecutar fetchEscuelas cuando se hace clic en el select
          >
            {loadingSelect ? ( // Mostrar mensaje de "Cargando..." mientras está cargando
              <option disabled>Cargando capítulos...</option>
            ) : (
              <>
                <option value="" disabled>Selecciona un capítulo</option>
                {escuelasList.map((escuela) => (
                  <option key={escuela.id} value={escuela.id}>{escuela.nombre_escuela}</option>
                ))}
              </>
            )}
          </select>
        </div>
        <button
            className={`bg-[#007336] hover:bg-[#458050] text-white transition duration-300 rounded py-2 px-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading} // Deshabilita el botón mientras está cargando
          >
            {isLoading ? <Spinner/> : 'Agregar especialidad'}
          </button>
      </div>
    </div>
  );
};
