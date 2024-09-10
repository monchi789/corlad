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
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    institucional: false,
    publicaciones: false,
    colegiatura: false
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const pathToLinkName: { [key: string]: string } = {
      '/': 'inicio',
      '/nosotros': 'nosotros',
      '/normativas': 'normativas',
      '/noticias': 'noticias',
      '/bolsa-trabajo': 'bolsa-trabajo',
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

  // Función genérica para manejar la apertura de dropdowns
  const handleMouseEnter = (dropdown: string) => {
    setIsDropdownOpen(prevState => ({
      ...prevState,
      [dropdown]: true
    }));
  };

  // Función genérica para manejar el cierre de dropdowns
  const handleMouseLeave = (dropdown: string) => {
    setIsDropdownOpen(prevState => ({
      ...prevState,
      [dropdown]: false
    }));
  };

  // Renderizar el menú móvil solo si está abierto
  const content = click ? (
    <div className="lg:hidden block absolute w-full top-20 left-0 right-0 bg-white text-[#00330a] transition z-20 pb-10">
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
            <div className="mt-2">
              <NavLink to="/nosotros" className={({ isActive }) =>
                `${isActive || activeLink === 'nosotros' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
              >
                Nosotros
              </NavLink>

              <NavLink to="/normativas" className={({ isActive }) =>
                `${isActive || activeLink === 'normativas' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
              >
                Normativas
              </NavLink>
            </div>
          </div>
        </li>
        <li className="my-4 py-4 border-b">
            <NavLink to="/noticias" className={({ isActive }) =>
              `${isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
            >
              Noticias
            </NavLink>

            <NavLink to="/bolsa-trabajo" className={({ isActive }) =>
              `${isActive || activeLink === 'bolsa-trabajo' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
            >
              Bolsa de trabajo
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
        <li>
            <NavLink to="/colegiatura" className={({ isActive }) =>
              `${isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
            >
              ¿Cómo colegiarse?
            </NavLink>

            <NavLink to="/consultar-habilidad" className={({ isActive }) =>
              `${isActive || activeLink === 'bolsa-trabajo' ? 'underline decoration-4 decoration-[#00330a]' : ''}
                block hover:bg-gray-100 transition duration-200 px-4 py-2`}
            >
              Consultar habilidad
            </NavLink>
        </li>
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
              onMouseEnter={() => handleMouseEnter('institucional')}
              onMouseLeave={() => handleMouseLeave('institucional')}
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
                absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-700
                transition-all duration-300 ease-in-out
                ${isDropdownOpen.institucional
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'}
                `}
              >
                <NavLink to="/nosotros" className={({ isActive }) =>
                  `${isActive || activeLink === 'nosotros' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'hover:text-[#008634]'} 
                  block hover:bg-gray-100 transition duration-200 px-4 py-2`}
                >
                  Nosotros
                </NavLink>

                <NavLink to="/normativas" className={({ isActive }) =>
                  `${isActive || activeLink === 'normativas' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'hover:text-[#008634]'}
                  block hover:bg-gray-100 transition duration-200 px-4 py-2`}
                >
                  Normativas
                </NavLink>
              </div>
            </li>
            <li
              className="hover:text-[#008634] transition duration-300 p-1 relative"
              onMouseEnter={() => handleMouseEnter('publicaciones')}
              onMouseLeave={() => handleMouseLeave('publicaciones')}
            >
              <NavLink
                to="/noticias"
                className={({ isActive }) => `${isActive || activeLink === 'noticias' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'bg-white'} flex items-center`}
                onClick={() => handleLinkClick('noticias')}
              >
                Publicaciones
                <FaCaretDown size={15} className="ml-1" />
              </NavLink>
              <div
                className={`
                absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg text-gray-700
                transition-all duration-300 ease-in-out
                ${isDropdownOpen.publicaciones
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'}
                `}
              >
                <NavLink to="/noticias" className={({ isActive }) =>
                  `${isActive || activeLink === 'noticias' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'hover:text-[#008634]'}
                  block hover:bg-gray-100 transition duration-200 px-4 py-2`}
                >
                  Noticias
                </NavLink>

                <NavLink to="/bolsa-trabajo" className={({ isActive }) =>
                  `${isActive || activeLink === 'bolsa-trabajo' ? 'text-[#00330a] underline decoration-4 decoration-[#00330a]' : 'hover:text-[#008634]'}
                  block hover:bg-gray-100 transition duration-200 px-4 py-2`}
                >
                  Bolsa de trabajo
                </NavLink>
              </div>
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
            <li className="hover:text-[#008634] transition duration-300 relative"
              onMouseEnter={() => handleMouseEnter('colegiatura')}
              onMouseLeave={() => handleMouseLeave('colegiatura')}
            >
              <NavLink
                to="/consultar-habilidad"
                className={({ isActive }) => `${isActive || activeLink === 'consultar-habilidad' ? '' : 'bg-white'} flex items-center`}
                onClick={() => handleLinkClick('consultar-habilidad')}
              >
                <button className="flex flex-row rounded-lg bg-[#00330a] text-lg text-white font-nunito font-semibold hover:bg-[#008634] transition duration-300 py-1 px-4">
                  Colegiatura
                  <FaCaretDown size={15} className="ml-1 my-auto" />
                </button>
              </NavLink>

              <div
                className={`
                absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-gray-700
                transition-all duration-300 ease-in-out
                ${isDropdownOpen.colegiatura
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 -translate-y-2 invisible'}
                `}
              >
                <NavLink to="/colegiatura" className={({ isActive }) =>
                  `${isActive || activeLink === 'noticias' ? ' bg-[#00330a] text-white hover:text-gray-700' : 'hover:text-[#008634]'}
                  block hover:bg-gray-100 transition duration-200 rounded-t-md px-4 py-2`}
                >
                  ¿Cómo colegiarse?
                </NavLink>

                <NavLink to="/consultar-habilidad" className={({ isActive }) =>
                  `${isActive || activeLink === 'bolsa-trabajo' ? 'bg-[#00330a] text-white hover:text-gray-700' : 'hover:text-[#008634]'}
                  block hover:bg-gray-100 transition duration-200 rounded-b-md px-4 py-2`}
                >
                  Consultar habilidad
                </NavLink>
              </div>
            </li>
          </ul>
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
