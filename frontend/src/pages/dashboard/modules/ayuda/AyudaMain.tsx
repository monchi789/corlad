import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, AlertCircle, ExternalLink } from 'lucide-react';
import { FaArrowCircleLeft } from 'react-icons/fa';

const AyudaMain = () => {
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState('contacto');

  const contactInfo = {
    email: 'wonderclouds.cusco@gmail.com',
    web: 'https://wonderclouds.dev/contactanos',
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-gray-900 p-2 transition duration-300 hover:scale-110"
        >
          <FaArrowCircleLeft size="30px" />
        </button>
        <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold ml-2">
          Centro de soporte
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

        {/* Sidebar de secciones */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Prioridad</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setSelectedSection('contacto')}
                className={`w-full text-left rounded transition-colors p-2 ${selectedSection === 'contacto'
                  ? 'bg-light text-corlad'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Contacto Directo</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedSection('urgente')}
                className={`w-full text-left rounded transition-colors p-2 ${selectedSection === 'urgente'
                  ? 'bg-light text-corlad'
                  : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Soporte Urgente</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido de soporte */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">
              {selectedSection === 'contacto' ? 'Contacto Directo' : 'Soporte Urgente'}
            </h2>

            {selectedSection === 'contacto' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-light transition-colors">
                  <Mail className="w-6 h-6 text-corlad" />
                  <div>
                    <h3 className="font-medium">Correo Electrónico</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-light transition-colors">
                  <Phone className="w-6 h-6 text-corlad" />
                  <div>
                    <h3 className="font-medium">Sitio web</h3>
                    <a
                      href={contactInfo.web}
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactInfo.web}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="font-medium">Soporte de Emergencia</h3>
                  </div>
                  <p className="mt-2 text-red-600">
                    Para casos urgentes que requieran atención inmediata
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  <p className="font-medium">Línea directa 24/7:</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="text-lg">+51 946 899 196</span>
                  </div>

                  <p className="text-sm text-gray-600 mt-4">
                    Use este número solo para emergencias técnicas críticas que afecten la operación del sistema.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ExternalLink className="w-4 h-4" />
              <a
                href="/docs/manual.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Consulta la guía del usuario aquí
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyudaMain;
