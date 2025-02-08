import React, { useState, useEffect } from "react";
import { updateEscuela } from "../../../../../api/escuela.api";
import { Escuela } from "../../../../../interfaces/model/Escuela";
import Spinner from "../../../components/ui/Spinner";

interface EditCapituloModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchoolUpdated: () => void;
  escuela: Escuela;
}

const EditCapituloModal: React.FC<EditCapituloModalProps> = ({
  isOpen,
  onClose,
  onSchoolUpdated,
  escuela,
}) => {
  const [schoolName, setSchoolName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (escuela) {
      setSchoolName(escuela.nombre_escuela);
    }
  }, [escuela]);

  const handleSubmit = async () => {
    if (!schoolName.trim()) {
      alert("El nombre del capítulo no puede estar vacío.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedSchoolData: Partial<Escuela> = {
        nombre_escuela: schoolName.trim(),
      };

      await updateEscuela(escuela.id, updatedSchoolData);

      // Notificar cambios y cerrar modal
      onSchoolUpdated();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el capítulo:", error);
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
        <h2 className="text-2xl mb-4">Editar capítulo</h2>

        {/* Campo de entrada */}
        <input
          type="text"
          placeholder="Nombre de la Escuela"
          className="w-full p-2 border rounded mb-4 shadow-lg border-[#00330A] focus:outline-none focus:ring-2 focus:ring-[#007336]"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />

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

export default EditCapituloModal;
