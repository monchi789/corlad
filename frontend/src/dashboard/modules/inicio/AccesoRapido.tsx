import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { School, Payment, Publish, OpenInBrowser, Slideshow, AccountBalance } from '@mui/icons-material';

const AccesoRapido = () => {
  const { hasGroup } = useAuth();

  const buttons = [
    { label: 'Nuevo colegiado', icon: <School sx={{ color: '#3A3A3A' }} />, link: '/admin/colegiado/nuevo-colegiado', group: ['secretaria', 'admin'] },
    { label: 'Nuevo capítulo', icon: <AccountBalance sx={{ color: '#3A3A3A' }} />, link: '/admin/capitulos', group: ['secretaria', 'admin'] },
    { label: 'Nuevo pago', icon: <Payment sx={{ color: '#3A3A3A' }} />, link: '/admin/pagos/nuevo-pago', group: ['secretaria', 'admin'] },
    { label: 'Nueva publicación', icon: <Publish sx={{ color: '#3A3A3A' }} />, link: '/admin/publicaciones/nueva-publicacion', group: ['publicador', 'admin'] },
    { label: 'Actualizar anuncio', icon: <OpenInBrowser sx={{ color: '#3A3A3A' }} />, link: '/admin/anuncios', group: ['publicador', 'admin'] },
    { label: 'Actualizar galería', icon: <Slideshow sx={{ color: '#3A3A3A' }} />, link: '/admin/galeria', group: ['publicador', 'admin'] },
  ];

  return (
    <div className="w-full my-10">
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-bold my-5">Acceso rápido</h4>
      <div className="flex flex-wrap gap-10">
        {buttons
          .filter(button => button.group.some(group => hasGroup(group))) // Filtra los botones según los grupos permitidos
          .map((button, index) => (
            <Link key={index} to={button.link}>
              <button className="w-full lg:w-[300px] bg-[#ECF6E8] rounded-lg hover:shadow-none shadow-[#00330A] shadow-md transition duration-300 space-x-2 p-5">
                {button.icon}
                <span className="text-[#3A3A3A] font-nunito font-bold">
                  {button.label}
                </span>
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AccesoRapido;
