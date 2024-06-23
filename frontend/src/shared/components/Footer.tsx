import { Link } from 'react-router-dom'
import logo_corlad_blanco from '../../assets/corlad_logo.png'
import { CiFacebook } from "react-icons/ci";
import { LiaYoutube } from "react-icons/lia";
import { CiLinkedin } from "react-icons/ci";

export function Footer() {
  return (
    <div className="w-full bg-[#363636] py-10">
      <div className="container space-x-5 w-4/6 mx-auto flex flex-row">
        <div className="flex flex-col w-2/5">
          <img className='size-3/6' src={logo_corlad_blanco} alt="" />
          <h3 className='font-extrabold text-2xl text-[#a67102] mt-6'>HORARIO</h3>
          <div className='text-white text-xl'>
            <p>Lunes a viernes 8:00 h. - 20:00 h.</p>
            <p>Sábado 8:00 h. - 13:00 h.</p>
          </div>
        </div>
        <div className='flex flex-col w-1/5'>
          <h3 className='font-extrabold text-2xl text-[#a67102] mt-20 mb-10'>MENU</h3>
          <div className='text-white text-xl'>
            <Link to={'/Inicio'}>
              <p>Inicio</p>
            </Link>
            <Link to={'/Inicio'}>
              <p>Nosotros</p>
            </Link>
            <Link to={'/Inicio'}>
              <p>Noticias</p>
            </Link>
            <Link to={'/Inicio'}>
              <p>Contactanos</p>
            </Link>
            <Link to={'/Inicio'}>
              <p>Consultar habilidad</p>
            </Link>
          </div>
        </div>
        <div className='w-1/5'>
          <h3 className='font-extrabold text-2xl text-[#a67102] mt-20 mb-10'>SIGUENOS</h3>
          <div className='flex flex-row text-white text-3xl space-x-10'>
            <CiFacebook />
            <LiaYoutube />
            <CiLinkedin />
          </div>
        </div>
        <div className='w-1/5'>
          <h3 className='font-extrabold text-2xl text-[#a67102] mt-20 mb-10'>TELÉFONOS</h3>
          <div className='text-white text-xl'>
            <p>Colegiatura y Trámites: 9999999</p>
            <p>Eventos Académicos: 99999999</p>
          </div>
        </div>
      </div>
    </div>
  )
}
