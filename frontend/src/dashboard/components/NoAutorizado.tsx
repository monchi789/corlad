import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#B50C0C] mb-4">Acceso Denegado</h1>
        <p className="text-lg text-gray-700 mb-6">No tienes permiso para acceder a esta página.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleGoBack} 
            className="flex items-center px-4 py-2 bg-[#007336] text-white rounded-lg shadow-md hover:bg-[#005A36] transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Regresar
          </button>
          <Link 
            to="/" 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized
