import { useState, useEffect } from 'react';
import logo from '../../assets/web/logo_main_corlad.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaCaretDown, FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import React from 'react';

export const Header = React.memo(function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const pathToLinkName: { [key: string]: string } = {
      '/': 'inicio',
      '/nosotros': 'nosotros',
      '/noticias': 'noticias',
      '/contactanos': 'contactanos',
      '/consultar-habilidad': 'consultar-habilidad'
    };
    setActiveLink(pathToLinkName[currentPath]);
  }, [location]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setClick(false); // Cierra el menú móvil al hacer clic en un enlace
  };

  const handleClick = () => setClick(!click);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  // Renderizar el menú móvil solo si está abierto
  const content = click ? (
    <div className="lg:hidden block absolute w-full top-20 left-0 right-0 bg-white transition z-20 pb-10">
      <ul className="text-center text-xl px-20 font-nunito font-semibold">
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/"
            className={({ isActive }) => isActive || activeLink === 'inicio' ? 'underline decoration-4 decoration-[#00330a]' : 'bg-white'}
            onClick={() => handleLinkClick('inicio')}
          >
            Inicio
          </NavLink>
        </li>
        <li className="my-4 py-4 border-b">
          <div className="relative">
            <NavLink
              to="/nosotros"
              className={({ isActive }) => isActive || activeLink === 'nosotros' ? 'underline decoration-4 decoration-[#00330a]' : 'bg-white'}
              onClick={() => handleLinkClick('nosotros')}
            >
              Nosotros
            </NavLink>
            <div className="mt-2">
              <a href="#" className="block py-2 hover:bg-gray-100">Subopción 1</a>
              <a href="#" className="block py-2 hover:bg-gray-100">Subopción 2</a>
              <a href="#" className="block py-2 hover:bg-gray-100">Subopción 3</a>
            </div>
          </div>
        </li>
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/noticias"
            className={({ isActive }) => isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#00330a]' : 'bg-white'}
            onClick={() => handleLinkClick('noticias')}
          >
            Noticias
          </NavLink>
        </li>
        <li className="my-4 py-4 border-b">
          <NavLink
            to="/contactanos"
            className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'underline decoration-4 decoration-[#00330a]' : 'bg-white'}
            onClick={() => handleLinkClick('contactanos')}
          >
            Contáctanos
          </NavLink>
        </li>
        <NavLink
          to="/consultar-habilidad"
          className={({ isActive }) => isActive || activeLink === 'consultar-habilidad' ? 'underline decoration-4 decoration-[#00330a]' : 'bg-white'}
          onClick={() => handleLinkClick('consultar-habilidad')}
        >
          <button className="mt-4 px-5 py-1 rounded-lg bg-[#00330a] text-[#ffffff] font-nunito font-semibold">
            Consultar habilidad
          </button>
        </NavLink>
      </ul>
    </div>
  ) : null;

  return (
    <nav>
      <div className="flex flex-row fixed bg-[#fff] h-10vh justify-between top-0 py-3 lg:py-5 mx-auto w-full 2xl:px-5 z-20">
        <Link className="flex items-center flex-1 ms-10" to="/">
          <img className="w-16 h-16 lg:w-20 lg:h-20" src={logo} alt="Logo" />
          <h1 className="hidden lg:block xl:text-lg text-[#04853D] font-nunito font-extrabold ms-3">
            COLEGIO REGIONAL DE LICENCIADOS <br /> EN ADMINISTRACIÓN - CUSCO
          </h1>
        </Link>
        <div className="hidden lg:flex lg:flex-1 my-auto items-center justify-end me-10">
          <ul className="flex gap-5 font-nunito text-lg font-semibold items-center">
            <li className="hover:text-[#008634] transition duration-300 p-1">
              <NavLink
                to="/"
                className={({ isActive }) => isActive || activeLink === 'inicio' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'bg-white'}
                onClick={() => handleLinkClick('inicio')}
              >
                Inicio
              </NavLink>
            </li>
            <li 
              className="hover:text-[#008634] transition duration-300 p-1 relative" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/nosotros"
                className={({ isActive }) => 
                  `${isActive || activeLink === 'nosotros' 
                    ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' 
                    : 'bg-white'} flex items-center`
                }
                onClick={() => handleLinkClick('nosotros')}
              >
                Institucional
                <FaCaretDown size={15} className="ml-1" />
              </NavLink>
              <div 
                className={`
                  absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700
                  transition-all duration-300 ease-in-out
                  ${isDropdownOpen 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-2 invisible'}
                `}
              >
                <NavLink to="/nosotros" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Nosotros</NavLink>
                <NavLink to="/normativas" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Normativas</NavLink>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition duration-200">Mision y visión</a>
              </div>
            </li>
            <li className="hover:text-[#008634] transition duration-300 p-1">
              <NavLink
                to="/noticias"
                className={({ isActive }) => isActive || activeLink === 'noticias' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'bg-white'}
                onClick={() => handleLinkClick('noticias')}
              >
                Publicaciones
              </NavLink>
            </li>
            <li className="hover:text-[#008634] transition duration-300 p-1">
              <NavLink
                to="/contactanos"
                className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'bg-white'}
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
            <button className="ms-5 py-1 px-3 rounded-lg bg-[#00330a] text-lg text-[#ffffff] font-nunito font-semibold hover:bg-[#008634] transition duration-300">
              Consultar habilidad
            </button>
          </NavLink>
        </div>
        <div>
          {content}
        </div>
        <button className="block lg:hidden transition me-10" onClick={handleClick}>
          {click ? <FaTimes size={25} color="#00330A" /> : <FiAlignJustify size={25} color="#00330A" />}
        </button>
      </div>
    </nav>
  );
});
