import React, { useState } from "react";
import { createEscuela } from "../../../../../api/escuela.api";
import { Escuela } from "../../../../../interfaces/model/Escuela";
import Spinner from "../../../components/ui/Spinner";

interface AddCapituloModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchoolAdded: () => void;
}

const AddCapituloModal: React.FC<AddCapituloModalProps> = ({
  isOpen,
  onClose,
  onSchoolAdded,
}) => {
  const [newEscuelaName, setNewEscuelaName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newEscuelaName.trim()) {
      alert("El nombre del capítulo no puede estar vacío.");
      return;
    }

    setIsLoading(true);
    try {
      const newSchoolData: Omit<Escuela, "id"> = {
        nombre_escuela: newEscuelaName.trim(),
      };

      await createEscuela(newSchoolData);

      onSchoolAdded();
      onClose();
      setNewEscuelaName(""); 
    } catch (error) {
      console.error("Error al crear el capítulo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      
      <div className="bg-[#ECF6E8] rounded-lg p-6 relative z-10 w-full max-w-md mx-auto font-nunito">
        <button
          aria-label="Cerrar modal"
          className="absolute top-2 right-2 w-8 h-8 bg-[#007336] hover:bg-[#458050] text-white rounded-full transition duration-300 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl mb-4">Registrar nuevo capítulo</h2>

        <input
          type="text"
          placeholder="Nombre del capítulo"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A] focus:outline-none focus:ring-2 focus:ring-[#007336]"
          value={newEscuelaName}
          onChange={(e) => setNewEscuelaName(e.target.value)}
        />

        <button
          className={`w-full py-2 px-4 rounded text-white transition duration-300 ${
            isLoading
              ? "bg-[#007336] opacity-50 cursor-not-allowed"
              : "bg-[#007336] hover:bg-[#458050]"
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Agregar capítulo"}
        </button>
      </div>
    </div>
  );
};

export default AddCapituloModal;
