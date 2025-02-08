import { useAuth } from '../../contexts/AuthContext';
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaGraduationCap,
  FaUniversity,
  FaRegCreditCard,
  FaNewspaper,
  FaImages,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa';
import { capitalize } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import StatCard from './components/StatCard';
import { getAllHistorialColegiado } from '../../../../api/historial.colegiado.api';
import { getAllPagos } from '../../../../api/pagos.api';
import { getAllPublicaciones } from '../../../../api/publicacion.api';
import { getAllEscuelas } from '../../../../api/escuela.api';
import { AiFillNotification } from 'react-icons/ai';

interface QuickAccessButtonProps {
  icon: React.ComponentType<{ className: string }>;
  label: string;
  link: string;
}

const QuickAccessButton = ({ icon: Icon, label, link }: QuickAccessButtonProps) => (
  <Link to={link} className="group relative overflow-hidden">
    <div className="bg-white hover:bg-gray-50 rounded-xl p-6 transition-all duration-300 border border-gray-100 hover:border-green-500 hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-300">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <span className="font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
    </div>
  </Link>
);

export default function InicioAdmin() {
  const { user, hasGroup } = useAuth();

  const [time, setTime] = useState(new Date());

  const [totalColegiados, setTotalColegiados] = useState(0)
  const [totalPagos, setTotalPagos] = useState(0)
  const [totalCapitulos, setTotalCapitulos] = useState(0)
  const [totalPublicaciones, setTotalPublicaciones] = useState(0)

  const cargarColegiados = useCallback(
    async () => {
      const res = await getAllHistorialColegiado();
      setTotalColegiados(res.data.count);
    },
    []
  );

  const cargarPagos = useCallback(
    async () => {
      const res = await getAllPagos();
      setTotalPagos(res.data.count);
    },
    []
  );

  const cargarCapitulos = useCallback(
    async () => {
      const res = await getAllEscuelas();
      setTotalCapitulos(res.data.count);
    },
    []
  );

  const cargarPublicaciones = useCallback(
    async () => {
      const res = await getAllPublicaciones();
      setTotalPublicaciones(res.data.count);
    },
    []
  );

  interface QuickAccessButtonData {
    label: string;
    icon: React.ComponentType<{ className: string }>;
    link: string;
    group: string[];
  }

  const quickAccessButtons: QuickAccessButtonData[] = [
    {
      label: "Nuevo colegiado",
      icon: FaGraduationCap,
      link: "/admin/colegiado/nuevo-colegiado",
      group: ["secretaria", "admin"]
    },
    {
      label: "Nuevo capítulo",
      icon: FaUniversity,
      link: "/admin/capitulos",
      group: ["secretaria", "admin"]
    },
    {
      label: "Nuevo pago",
      icon: FaRegCreditCard,
      link: "/admin/pagos/nuevo-pago",
      group: ["secretaria", "admin"]
    },
    {
      label: "Nueva publicación",
      icon: FaNewspaper,
      link: "/admin/publicaciones/nueva-publicacion",
      group: ["publicador", "admin"]
    },
    {
      label: "Gestionar anuncios",
      icon: AiFillNotification,
      link: "/admin/galeria",
      group: ["publicador", "admin"]
    },
    {
      label: "Gestionar galería",
      icon: FaImages,
      link: "/admin/galeria",
      group: ["publicador", "admin"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    cargarColegiados();
    cargarPagos();
    cargarPublicaciones();
    cargarCapitulos();
  }, [cargarColegiados, cargarPagos, cargarCapitulos, cargarPublicaciones]);

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="bg-gradient-to-r from-best-green to-green-600 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-full">
              <FaUserCircle className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                ¡Bienvenido, {capitalize(user?.username || 'Administrador')}!
              </h1>
              <p className="text-green-50 mt-1">
                Panel de administración - CORLAD Cusco
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end text-white space-y-2 mt-4 md:mt-0 ">
            <div className="flex items-center space-x-2">
              <FaClock className="h-5 w-5" />
              <span>{time.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="h-5 w-5" />
              <span>{new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Colegiados"
          value={totalColegiados}
          icon={FaGraduationCap}
          color="bg-green-500"
        />
        <StatCard
          title="Capítulos"
          value={totalCapitulos}
          icon={FaUniversity}
          color="bg-green-500"
        />
        <StatCard
          title="Total de pagos"
          value={totalPagos}
          icon={FaRegCreditCard}
          color="bg-green-500"
        />
        <StatCard
          title="Publicaciones"
          value={totalPublicaciones}
          icon={FaNewspaper}
          color="bg-green-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Acceso Rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccessButtons
            .filter(button => button.group.some(group => hasGroup(group)))
            .map((button, index) => (
              <QuickAccessButton
                key={index}
                icon={button.icon}
                label={button.label}
                link={button.link}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
