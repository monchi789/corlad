import { useState, useEffect } from 'react';
import logo from '../../assets/web/logo_main_corlad.png';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import React from 'react';

export const Header = React.memo(function Header() {
  const [activeLink, setActiveLink] = useState<string>('');
  const location = useLocation();
  const [click, setClick] = useState(false);

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

  // Renderizar el menú móvil solo si está abierto
  const content = click ? (
    <div className="lg:hidden block absolute w-full top-20 left-0 right-0 bg-white transition z-20 pb-10">
      <ul className="text-center text-xl px-20 font-nunito font-semibold">
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
          <button className="mt-4 px-5 py-1 rounded-lg bg-[#00330a] text-[#ffffff] font-nunito font-semibold">
            Consultar habilidad
          </button>
        </NavLink>
      </ul>
    </div>
  ) : null;

  return (
    <nav>
      <div className="flex flex-row fixed bg-[#fff] h-10vh justify-between top-0 py-3 lg:py-5 mx-auto w-full 2xl:px-32 z-20">
        <div className="flex items-center flex-1 ms-10">
          <img className="w-16 h-16 lg:w-20 lg:h-20" src={logo} alt="Logo" />
          <h1 className="hidden lg:block xl:text-xl text-[#04853D] font-nunito font-extrabold ms-3">
            COLEGIO REGIONAL DE LICENCIADOS <br /> EN ADMINISTRACIÓN - CUSCO
          </h1>
        </div>
        <div className="hidden lg:flex lg:flex-1 my-auto items-center justify-end me-10">
          <ul className="flex gap-8 font-nunito text-lg font-semibold items-center">
            <li className="hover:text-[#a67102] transition duration-300 p-1">
              <NavLink
                to="/"
                className={({ isActive }) => isActive || activeLink === 'inicio' ? 'text-[#a67102] underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                onClick={() => handleLinkClick('inicio')}
              >
                Inicio
              </NavLink>
            </li>
            <li className="hover:text-[#a67102] transition duration-300 p-1">
              <NavLink
                to="/nosotros"
                className={({ isActive }) => isActive || activeLink === 'nosotros' ? 'text-[#a67102] underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                onClick={() => handleLinkClick('nosotros')}
              >
                Nosotros
              </NavLink>
            </li>
            <li className="hover:text-[#a67102] transition duration-300 p-1">
              <NavLink
                to="/noticias"
                className={({ isActive }) => isActive || activeLink === 'noticias' ? 'text-[#a67102] underline decoration-4 decoration-[#a67102]' : 'bg-white'}
                onClick={() => handleLinkClick('noticias')}
              >
                Noticias
              </NavLink>
            </li>
            <li className="hover:text-[#a67102] transition duration-300 p-1">
              <NavLink
                to="/contactanos"
                className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'text-[#a67102] underline decoration-4 decoration-[#a67102]' : 'bg-white'}
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
            <button className="ms-10 py-1 px-3 rounded-lg bg-[#00330a] text-lg text-[#ffffff] font-nunito font-semibold hover:bg-green-800 transition duration-300">
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
