import React from 'react';
import { HistorialColegiado } from "../../../../../interfaces/model/HistorialColegiado";
import { X, User, CheckCircle2, XCircle, AlertCircle, AlertTriangle } from "lucide-react";
import capitalize from '../../../../../utils/capitalize';

interface ViewColegiadoModalProps {
  isOpen: boolean;
  onClose: () => void;
  colegiado: HistorialColegiado | null;
}

interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
}

const InfoField = ({ label, value, className = "" }: InfoFieldProps) => (
  <div className={`space-y-1 ${className}`}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base font-semibold text-gray-900">{value}</p>
  </div>
);

// Define the possible status values
type StatusType = 'ACTIVO' | 'NO_ACTIVO' | 'TRASLADADO' | 'FALLECIDO';

interface StatusConfig {
  text: string;
  color: string;
  icon: React.ReactNode;
}

const StatusBadge = ({ status }: { status: StatusType }) => {
  // Define the statusConfig with explicit types
  const statusConfig: Record<StatusType, StatusConfig> = {
    'ACTIVO': {
      text: 'Activo',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircle2 className="mr-2 text-green-600" />
    },
    'NO_ACTIVO': {
      text: 'No Activo',
      color: 'bg-red-100 text-red-800',
      icon: <XCircle className="mr-2 text-red-600" />
    },
    'TRASLADADO': {
      text: 'Trasladado',
      color: 'bg-blue-100 text-blue-800',
      icon: <AlertCircle className="mr-2 text-blue-600" />
    },
    'FALLECIDO': {
      text: 'Fallecido',
      color: 'bg-gray-100 text-gray-800',
      icon: <AlertTriangle className="mr-2 text-gray-600" />
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${config.color}`}>
      {config.icon}
      <span className="font-semibold">{config.text}</span>
    </div>
  );
};

const ViewColegiadoModal: React.FC<ViewColegiadoModalProps> = ({ isOpen, onClose, colegiado }) => {
  if (!isOpen || !colegiado) return null;

  const fullName = `${colegiado.id_colegiado.nombre} ${colegiado.id_colegiado.apellido_paterno} ${colegiado.id_colegiado.apellido_materno}`;

  // Determinar el estado basado en los 4 estados especificados
  const determineEstado = (): StatusType => {
    if (colegiado.id_colegiado.estado_activo === "FALLECIDO") return 'FALLECIDO';
    if (colegiado.id_colegiado.estado_activo === "TRASLADADO") return 'TRASLADADO';
    if (colegiado.id_colegiado.estado_activo === "NO_ACTIVO") return 'NO_ACTIVO';
    return 'ACTIVO';
  };

  const estado = determineEstado();
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-lg shadow-lg z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-end items-center p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center p-6 space-x-0 md:space-x-6 bg-gray-50">
          <div className="mb-4 md:mb-0 relative">
            {colegiado.id_colegiado.foto_colegiado ? (
              <img 
                src={import.meta.env.VITE_API_URL_ALTER + colegiado.id_colegiado.foto_colegiado} 
                alt={`Foto de ${fullName}`} 
                className="w-60 h-48 object-cover rounded-full border-4 border-best-green shadow-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={64} className="text-gray-500" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left w-full">
            <h2 className="text-3xl font-bold text-best-green mb-2">
              {fullName}
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <p className="text-lg text-gray-700">
                  <strong>N° Colegiatura:</strong> {colegiado.id_colegiado.numero_colegiatura}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>DNI:</strong> {colegiado.id_colegiado.dni_colegiado}
                </p>
              </div>
              
              <StatusBadge status={estado} />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-best-green border-b pb-2">
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoField
                label="Fecha de colegiatura"
                value={new Date(colegiado.id_colegiado.fecha_colegiatura).toLocaleDateString()}
              />
              <InfoField
                label="Fecha de nacimiento"
                value={colegiado.id_colegiado.fecha_nacimiento}
              />
              <InfoField
                label="Estado civil"
                value={capitalize(colegiado.id_colegiado.estado_civil) || "No especificado"}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-best-green border-b pb-2">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoField
                label="Teléfono"
                value={colegiado.id_colegiado.celular || "No especificado"}
              />
              <InfoField
                label="Correo"
                value={colegiado.id_colegiado.correo || "No especificado"}
              />
              <InfoField
                label="Dirección"
                value={colegiado.id_colegiado.direccion || "No especificada"}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-best-green border-b pb-2">
              Información Profesional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoField
                label="Universidad"
                value={colegiado.universidad || "No especificada"}
              />
              <InfoField
                label="Capítulo"
                value={colegiado.id_especialidad?.id_escuela.nombre_escuela || "No especificada"}
              />
              <InfoField
                label="Especialidad"
                value={colegiado.id_especialidad?.nombre_especialidad || "No especificada"}
              />
              <InfoField
                label="Universidad Bachiller"
                value={colegiado.nombre_universidad_bachiller || "No especificada"}
              />
              <InfoField
                label="Fecha de bachiller"
                value={colegiado.fecha_bachiller || "No especificada"}
              />
              <InfoField
                label="Denominación bachiller"
                value={colegiado.denominacion_bachiller || "No especificada"}
              />
              <InfoField
                label="Universidad Título"
                value={colegiado.nombre_universidad_titulo || "No especificada"}
              />
              <InfoField
                label="Fecha de graduación"
                value={colegiado.titulo_fecha || "No especificada"}
              />
              <InfoField
                label="Denominación título"
                value={colegiado.denominacion_titulo || "No especificada"}
              />
            </div>
          </div>
        </div>

        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white rounded-lg px-6 py-2 hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewColegiadoModal;
