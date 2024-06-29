import { Link } from 'react-router-dom'
import logo_corlad_blanco from '../../assets/corlad_logo.png'
import { CiFacebook } from "react-icons/ci";
import { LiaYoutube } from "react-icons/lia";
import { CiLinkedin } from "react-icons/ci";

export function Footer() {
  return (
    <div className="w-full bg-[#363636] py-10 font-didact">
      <div className="container flex flex-col md:flex-row md:space-x-5 w-4/6 mx-auto">
        <div className="flex flex-col md:w-2/5">
          <img className='w-3/6 md:w-5/6 lg:w-1/2' src={logo_corlad_blanco} alt="" />
          <h3 className='font-extrabold text-xl text-[#a67102] mt-6 mb-3 font-nunito'>HORARIO</h3>
          <div className='text-white text-lg font-didact'>
            <p>Lunes a viernes 8:00 h. - 20:00 h.</p>
            <p>Sábado 8:00 h. - 13:00 h.</p>
          </div>
        </div>
        <div className='flex flex-col md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-5 font-nunito'>MENÚ</h3>
          <div className='text-white text-lg font-didact'>
            <Link to={'/Inicio'}>
              <p className='py-0.5'>Inicio</p>
            </Link>
            <Link to={'/Inicio'}>
              <p className='py-0.5'>Nosotros</p>
            </Link>
            <Link to={'/Inicio'}>
              <p className='py-0.5'>Noticias</p>
            </Link>
            <Link to={'/Inicio'}>
              <p className='py-0.5'>Contactanos</p>
            </Link>
            <Link to={'/Inicio'}>
              <p className='py-0.5'>Consultar habilidad</p>
            </Link>
          </div>
        </div>
        <div className='md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-10 font-nunito md:text-center lg:text-start'>SÍGUENOS</h3>
          <div className='flex flex-row md:flex-col lg:flex-row text-white text-3xl md:space-y-0 xl:space-y-0 space-x-5 md:space-x-0 xl:space-x-5 items-center'>
            <CiFacebook />
            <LiaYoutube />
            <CiLinkedin />
          </div>
        </div>
        <div className='md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-5 font-nunito'>TELÉFONOS</h3>
          <div className='text-white text-lg space-y-3 font-didact'>
            <p>Colegiatura y Trámites 9999999</p>
            <p>Eventos Académicos 99999999</p>
          </div>
        </div>
      </div>
    </div>
  )
}
