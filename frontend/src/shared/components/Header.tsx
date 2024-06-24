import { useState, useEffect } from 'react';
import logo from '../../assets/corlad_logo.png';
import { NavLink, useLocation } from 'react-router-dom';

import { FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";


export function Header() {
  const [activeLink, setActiveLink] = useState<string>('inicio');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pathToLinkName: { [key: string]: string } = {
      '/': 'inicio',
      '/nosotros': 'nosotros',
      '/noticias': 'noticias',
      '/contactanos': 'contactanos',
      '/consultar-habilidad': 'consultar-habilidad'
    };
    setActiveLink(pathToLinkName[currentPath] || 'inicio');
  }, [location]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  /* Navbar responsive */
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)

  const content = <>
    <div className='lg:hidden block absolute w-full top-28 left-0 right-0 bg-white transition z-20 pb-10'>
      <ul className="text-center text-xl px-20">
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/"
            className={({ isActive }) => isActive || activeLink === 'inicio' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
            onClick={() => handleLinkClick('inicio')}
          >
            Inicio
          </NavLink>
        </li>
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/nosotros"
            className={({ isActive }) => isActive || activeLink === 'nosotros' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
            onClick={() => handleLinkClick('nosotros')}
          >
            Nosotros
          </NavLink>
        </li>
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/noticias"
            className={({ isActive }) => isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
            onClick={() => handleLinkClick('noticias')}
          >
            Noticias
          </NavLink>
        </li>
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/contactanos"
            className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
            onClick={() => handleLinkClick('contactanos')}
          >
            Contáctanos
          </NavLink>
        </li>
        <NavLink
          to="/consultar-habilidad"
          className={({ isActive }) => isActive || activeLink === 'consultar-habilidad' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
          onClick={() => handleLinkClick('consultar-habilidad')}
        >
          <button className="mt-4 px-5 py-1 rounded-lg bg-[#00330a] text-[#ffffff]">
            Consultar habilidad
          </button>
        </NavLink>
      </ul>
    </div>


  </>

  return (
    <nav>
      <div className="container h-10vh flex flex-row justify-between lg:py-5 mx-auto my-5">
        <div className='flex items-center flex-1 ms-10'>
          <img className="size-24" src={logo} alt="Logo" />
        </div>
        <div className="lg:flex md:flex lg:flex-1 my-auto items-center justify-end hidden">
          <div className='flex flex-row flex-10'>
            <ul className="flex gap-8">
              <li className="me-5 p-1">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive || activeLink === 'inicio' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                  onClick={() => handleLinkClick('inicio')}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="mx-5 p-1">
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) => isActive || activeLink === 'nosotros' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                  onClick={() => handleLinkClick('nosotros')}
                >
                  Nosotros
                </NavLink>
              </li>
              <li className="mx-5 p-1">
                <NavLink
                  to="/noticias"
                  className={({ isActive }) => isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                  onClick={() => handleLinkClick('noticias')}
                >
                  Noticias
                </NavLink>
              </li>
              <li className="mx-5 p-1">
                <NavLink
                  to="/contactanos"
                  className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                  onClick={() => handleLinkClick('contactanos')}
                >
                  Contáctanos
                </NavLink>
              </li>
            </ul>
            <NavLink
              to="/consultar-habilidad"
              className={({ isActive }) => isActive || activeLink === 'consultar-habilidad' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'}
              onClick={() => handleLinkClick('consultar-habilidad')}
            >
              <button className="ms-10 py-1 px-3 rounded-lg bg-[#00330a] text-[#ffffff]">

                Consultar habilidad
              </button>
            </NavLink>
          </div>
        </div>
        <div>
          {click && content}
        </div>
        <button className='block sm:hidden transition me-10' onClick={handleClick}>
          {click ? <FaTimes /> : <FiAlignJustify />}
        </button>
      </div>
    </nav>
  );
}
