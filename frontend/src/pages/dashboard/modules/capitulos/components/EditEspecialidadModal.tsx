import React, { useState, useEffect } from "react";
import { updateEspecialidad, getAllEscuelas } from "../../../../../api/escuela.api";
import { Escuela } from "../../../../../interfaces/model/Escuela";
import { Especialidad } from "../../../../../interfaces/model/Especialidad";
import Spinner from "../../../components/ui/Spinner";

interface EditEspecialidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpecialtyUpdated: () => void;
  especialidad: Especialidad;
}

const EditEspecialidadModal: React.FC<EditEspecialidadModalProps> = ({
  isOpen,
  onClose,
  onSpecialtyUpdated,
  especialidad,
}) => {
  const [specialtyName, setSpecialtyName] = useState("");
  const [selectedEscuelaId, setSelectedEscuelaId] = useState<number | null>(null);
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (especialidad) {
      setSpecialtyName(especialidad.nombre_especialidad);
      setSelectedEscuelaId(especialidad.id_escuela?.id ?? null);
    }
  }, [especialidad]);

  const handleSubmit = async () => {
    if (!specialtyName.trim()) {
      alert("El nombre de la especialidad no puede estar vacío.");
      return;
    }
    if (selectedEscuelaId === null) {
      alert("Debe seleccionar una escuela.");
      return;
    }

    setIsLoading(true);

    try {
      const updatedSpecialtyData: Partial<Especialidad> = {
        nombre_especialidad: specialtyName.trim(),
        id_escuela: escuelasList.find((escuela) => escuela.id === selectedEscuelaId) || undefined,
      };

      await updateEspecialidad(especialidad.id, updatedSpecialtyData);

      onSpecialtyUpdated(); // Notificar el éxito
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar la especialidad:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo de overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

      {/* Contenedor del modal */}
      <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
        {/* Botón de cierre */}
        <button
          aria-label="Cerrar modal"
          className="absolute top-2 right-2 bg-[#007336] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#458050] transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-2xl mb-4">Editar especialidad</h2>

        {/* Campo de entrada */}
        <input
          type="text"
          placeholder="Nombre de la Especialidad"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A] focus:outline-none focus:ring-2 focus:ring-[#007336]"
          value={specialtyName}
          onChange={(e) => setSpecialtyName(e.target.value)}
        />

        {/* Dropdown de escuelas */}
        <div className="mb-4">
          <label className="block mb-2">Escuela</label>
          <select
            className="w-full p-2 border rounded shadow-lg border-[#00330A] focus:outline-none focus:ring-2 focus:ring-[#007336]"
            value={selectedEscuelaId ?? ""}
            onChange={(e) => setSelectedEscuelaId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona una escuela
            </option>
            {escuelasList.map((escuela) => (
              <option key={escuela.id} value={escuela.id}>
                {escuela.nombre_escuela}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de guardar */}
        <button
          className={`w-full py-2 px-4 rounded text-white transition duration-300 ${
            isLoading
              ? "bg-[#007336] opacity-50 cursor-not-allowed"
              : "bg-[#007336] hover:bg-[#458050]"
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
};

export default EditEspecialidadModal;
