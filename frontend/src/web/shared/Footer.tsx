import { Link } from 'react-router-dom'
import logo_corlad_blanco from '../../assets/web/corlad_logo_blanco.png'
import { CiFacebook } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <div className="w-full bg-[#363636] pt-5 font-didact">
      <div className="container flex flex-col md:flex-row md:space-x-5 w-4/6 mx-auto">
        <div className="flex flex-col md:w-2/5">
          <Link to={"/"}><img className='w-3/6 md:w-5/6 lg:w-1/2' src={logo_corlad_blanco} alt="Logo del corlad" /></Link>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-6 mb-3 font-nunito'>HORARIO DE ATENCIÓN</h3>
          <div className='text-white text-lg font-didact'>
            <p>Lunes a viernes 09:00 h. - 18:00 h.</p>
            <p>Sábados 09:00 h. - 13:00 h.</p>
          </div>
        </div>
        <div className='flex flex-col md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-5 font-nunito'>MENÚ</h3>
          <div className='text-white text-lg font-didact'>
            <Link to={'/'}>
              <p className='hover:text-[#a67102] transition duration-300 py-0.5'>Inicio</p>
            </Link>
            <Link to={'/nosotros'}>
              <p className='hover:text-[#a67102] transition duration-300 py-0.5'>Institucional</p>
            </Link>
            <Link to={'/noticias'}>
              <p className='hover:text-[#a67102] transition duration-300 py-0.5'>Noticias</p>
            </Link>
            <Link to={'/contactanos'}>
              <p className='hover:text-[#a67102] transition duration-300 py-0.5'>Contáctenos</p>
            </Link>
            <Link to={'/consultar-habilidad'}>
              <p className='hover:text-[#a67102] transition duration-300 py-0.5'>Consultar habilidad</p>
            </Link>
          </div>
        </div>
        <div className='md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-10 font-nunito md:text-center lg:text-start'>SÍGUENOS</h3>
          <div className='flex flex-row md:flex-col lg:flex-row text-white text-3xl md:space-y-0 xl:space-y-0 space-x-5 md:space-x-0 xl:space-x-5 items-center'>
            <a href="https://www.facebook.com/cuscocorlad" className="hover:text-[#a67102] transition duration-300" ><CiFacebook size={30} /></a>
            <a href="https://www.tiktok.com/@corladcusco" className="hover:text-[#a67102] transition duration-300" ><FaTiktok size={25} /></a>
          </div>
        </div>
        <div className='md:w-1/5'>
          <h3 className='font-extrabold text-xl text-[#a67102] mt-20 mb-5 font-nunito'>TELÉFONOS</h3>
          <div className='text-white text-lg space-y-3 font-didact'>
            <span>Informes y Trámites</span> <br />
            <span>+51 940 033 003</span>
          </div>
        </div>
      </div>
      <div className="text-center text-white font-nunito py-5">
        <span className="text-sm"><a href="https://www.wonderclouds.dev">By @WonderClouds</a></span>
      </div>
    </div>
  )
}
