import React, { useState, useEffect } from "react";
import { Escuela } from "../../../../../interfaces/model/Escuela";
import { getAllEscuelas, createEspecialidad } from "../../../../../api/escuela.api";
import { Especialidad } from "../../../../../interfaces/model/Especialidad";
import Spinner from "../../../components/ui/Spinner";

interface AddEspecialidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpecialtyAdded: () => void;
}

const AddEspecialidadModal: React.FC<AddEspecialidadModalProps> = ({ isOpen, onClose, onSpecialtyAdded }) => {
  const [newEspecialidadName, setNewEspecialidadName] = useState("");
  const [selectedEscuelaId, setSelectedEscuelaId] = useState<number | null>(null);
  const [escuelasList, setEscuelasList] = useState<Escuela[]>([]);
  const [isFetchingEscuelas, setIsFetchingEscuelas] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchEscuelas();
    }
  }, [isOpen]);

  const fetchEscuelas = async () => {
    setIsFetchingEscuelas(true);
    try {
      const { data } = await getAllEscuelas();
      setEscuelasList(data as Escuela[]);
    } catch (error) {
      console.error("Error fetching escuelas:", error);
    } finally {
      setIsFetchingEscuelas(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedEscuelaId || !newEspecialidadName.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const newSpecialtyData: Omit<Especialidad, "id"> = {
        nombre_especialidad: newEspecialidadName,
        id_escuela: escuelasList.find((escuela) => escuela.id === selectedEscuelaId)!,
      };

      await createEspecialidad(newSpecialtyData);

      onSpecialtyAdded(); 
      onClose();
      setNewEspecialidadName("");
      setSelectedEscuelaId(null);
    } catch (error) {
      console.error("Error creating especialidad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-[#007336] hover:bg-[#458050] text-white transition duration-300 rounded-full flex items-center justify-center"
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
            value={selectedEscuelaId ?? ""}
            onChange={(e) => setSelectedEscuelaId(Number(e.target.value))}
            disabled={isFetchingEscuelas}
          >
            <option value="" disabled>
              {isFetchingEscuelas ? "Cargando capítulos..." : "Selecciona un capítulo"}
            </option>
            {escuelasList.map((escuela) => (
              <option key={escuela.id} value={escuela.id}>
                {escuela.nombre_escuela}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`bg-[#007336] hover:bg-[#458050] text-white transition duration-300 rounded py-2 px-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Agregar especialidad"}
        </button>
      </div>
    </div>
  );
};

export default AddEspecialidadModal;
