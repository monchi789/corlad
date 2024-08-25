import { useLocation } from 'react-router-dom';
import logo_wpp from '../../assets/web/icono.png'

function WhatsAppButton() {
  const number = import.meta.env.VITE_WHATSAPP;

  const location = useLocation();

  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/unauthorized')) {
    return null;
  }  

  return (
    <a 
      className="fixed bottom-5 right-6 p-4 bg-[#2e6329] rounded-full z-10 transition-transform duration-500 ease-in-out hover:scale-110 animate-efecto" 
      href={`https://wa.me/${number}?text=Hola, quisiera realizar una consulta!!!`}
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img className="w-10 transition-all duration-1000 ease-in-out" src={logo_wpp} alt="WhatsApp Logo"/>
    </a>
  );
}

export default WhatsAppButton;
