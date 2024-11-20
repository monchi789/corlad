import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDropdown } from "../../contexts/DropdownContext";
import {
  AiFillNotification
} from "react-icons/ai";
import { FaUsers, FaMoneyCheck } from "react-icons/fa";
import { IoSchoolSharp, IoImages } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLogout, MdMenu, MdDashboard, MdHelp } from "react-icons/md";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { RiDiscountPercentFill, RiPriceTag3Fill } from "react-icons/ri";
import logo_corlad from "../../../../assets/dashboard/corlad_logo_blanco.png";

interface MenuItem {
  to: string;
  icon: React.ReactNode;
  text: string;
  requiresGroup?: string[];
}

interface SubMenuItem {
  to: string;
  text: string;
}

interface DropdownMenuItem {
  title: string;
  icon: React.ReactNode;
  items: SubMenuItem[];
  requiresGroup?: string[];
}

const menuItems: MenuItem[] = [
  { to: "/admin", icon: <MdDashboard size={22} />, text: "Panel general" },
  {
    to: "/admin/colegiado",
    icon: <FaUsers size={22} />,
    text: "Colegiados",
    requiresGroup: ['secretaria', 'admin'],
  },
  {
    to: "/admin/capitulos",
    icon: <IoSchoolSharp size={22} />,
    text: "Capítulos",
    requiresGroup: ['secretaria', 'admin']
  },
  {
    to: "/admin/pagos",
    icon: <FaMoneyCheck size={22} />,
    text: "Pagos",
    requiresGroup: ['secretaria', 'admin'],
  },
  {
    to: "/admin/pagos/estado-cuenta",
    icon: <RiDiscountPercentFill size={22} />,
    text: "Estados de cuenta",
    requiresGroup: ['secretaria', 'admin']
  },
  {
    to: "/admin/tarifas",
    icon: <RiPriceTag3Fill size={22} />,
    text: "Tarifas",
    requiresGroup: ['secretaria', 'admin']
  },
  {
    to: "/admin/anuncios",
    icon: <AiFillNotification size={22} />,
    text: "Anuncios",
    requiresGroup: ['publicador', 'admin']
  },
  {
    to: "/admin/galeria",
    icon: <IoImages size={22} />,
    text: "Galerías",
    requiresGroup: ['publicador', 'admin']
  },
];

const dropdownMenus: DropdownMenuItem[] = [
  {
    title: "Publicaciones",
    icon: <PiNewspaperClippingFill size={22} />,
    requiresGroup: ['publicador', 'admin'],
    items: [
      { to: "/admin/publicaciones", text: "Lista de publicaciones" },
      { to: "/admin/publicaciones/categorias", text: "Categorías" }
    ]
  }
];

const bottomMenuItems: MenuItem[] = [
  { to: "/admin/ayuda", icon: <MdHelp size={22} />, text: "Ayuda" },
];

export const Sidebar = () => {
  const { hasGroup, logout, user } = useAuth();
  const { dropdownStates, toggleDropdown } = useDropdown();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const MenuLink: React.FC<MenuItem> = ({ to, icon, text }) => {
    const isActive = location.pathname === to;

    return (
      <Link to={to}>
        <li className={`
          group flex items-center justify-between p-3 mx-3 mb-1 rounded-xl
          transition-all duration-300
          ${isActive
            ? 'bg-[#CCB23A] text-white'
            : 'hover:bg-[#0a8541] text-[#ECF6E8]'}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
        `}>
          <div className="flex items-center space-x-4">
            <span className={`${isActive ? 'text-white' : 'text-[#ECF6E8]'} group-hover:text-white`}>
              {icon}
            </span>
            <span className={`text-base ${isActive ? 'font-semibold' : 'font-medium'} group-hover:text-white`}>
              {text}
            </span>
          </div>
        </li>
      </Link>
    );
  };

  const DropdownMenu: React.FC<DropdownMenuItem> = ({ title, icon, items }) => {
    const isAnyItemActive = items.some(item => location.pathname === item.to);

    return (
      <li className="mx-3 mb-1">
        <button
          onClick={() => toggleDropdown(title.toLowerCase())}
          className={`
            w-full group flex items-center justify-between p-3 rounded-xl
            transition-all duration-300
            ${isAnyItemActive
              ? 'bg-[#CCB23A] text-white'
              : 'hover:bg-[#0a8541] text-[#ECF6E8]'}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
          `}
          aria-expanded={dropdownStates[title.toLowerCase()]}
        >
          <div className="flex items-center space-x-4">
            <span className={`${isAnyItemActive ? 'text-white' : 'text-[#ECF6E8]'} group-hover:text-white`}>
              {icon}
            </span>
            <span className={`text-base ${isAnyItemActive ? 'font-semibold' : 'font-medium'} group-hover:text-white`}>
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#ECF6E8] group-hover:text-white">
              {dropdownStates[title.toLowerCase()] ?
                <IoIosArrowUp size={20} /> :
                <IoIosArrowDown size={20} />
              }
            </span>
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${dropdownStates[title.toLowerCase()] ? 'max-h-screen' : 'max-h-0'
            }`}
        >
          <ul className="pl-11 pt-1 space-y-1">
            {items.map((item, index) => {
              const isActive = location.pathname === item.to;
              return (
                <Link key={index} to={item.to}>
                  <li className={`
                    group flex items-center justify-between p-2 rounded-xl
                    transition-all duration-300
                    ${isActive
                      ? 'bg-[#CCB23A] text-white'
                      : 'hover:bg-[#0a8541] text-[#ECF6E8]'}
                  `}>
                    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                      {item.text}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-auto right-5 md:right-auto md:left-2 z-50 p-2 bg-[#007336] text-white rounded-lg xl:hidden hover:bg-[#0a8541] focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
      >
        <MdMenu size={24} />
      </button>

      <nav
        className={`
          flex flex-col w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/5 
          fixed inset-y-0 left-0 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          xl:relative xl:translate-x-0 
          transition-transform duration-200 ease-in-out 
          h-svh bg-[#007336] shadow-lg shadow-black/20
          overflow-y-auto z-40
        `}
        aria-label="Main navigation"
      >
        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#CCB23A] scrollbar-track-[#0a8541]">
          <div className="font-nunito">
            {/* Header with logo and time */}
            <header className="flex flex-col space-y-4 p-5 border-b border-[#0a8541]">
              <div className="flex items-center space-x-3">
                <img
                  className="w-12 h-12"
                  src={logo_corlad}
                  alt="Logo del CORLAD Cusco"
                />
                <h1 className="text-xl text-white font-black">CORLAD CUSCO</h1>
              </div>
            </header>

            {/* User profile section */}
            <div className="p-4 m-3 bg-[#0a8541] rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#ECF6E8] flex items-center justify-center">
                  <span className="text-[#0a8541] text-2xl font-nunito font-semibold">
                    {user?.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-white font-semibold">{user?.username}</h2>
                  <p className="text-[#ECF6E8] text-sm">Cargo: {user?.groups}</p>
                </div>
              </div>
            </div>

            {/* Main menu */}
            <div className="my-6">
              <h2 className="px-6 mb-3 text-sm font-semibold text-[#CCB23A]">MENU PRINCIPAL</h2>
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  !item.requiresGroup || hasGroup(...item.requiresGroup) ? (
                    <MenuLink key={index} {...item} />
                  ) : null
                ))}

                {dropdownMenus.map((menu, index) => (
                  !menu.requiresGroup || hasGroup(...menu.requiresGroup) ? (
                    <DropdownMenu key={index} {...menu} />
                  ) : null
                ))}
              </ul>
            </div>

            {/* Bottom menu */}
            <div className="mb-6">
              <h2 className="px-6 mb-3 text-sm font-semibold text-[#CCB23A]">SOPORTE</h2>
              <ul className="space-y-1">
                {bottomMenuItems.map((item, index) => (
                  <MenuLink key={index} {...item} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center justify-between p-3 mx-3 mb-3 rounded-xl
            text-[#ECF6E8] hover:bg-red-600 hover:text-white
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <div className="flex items-center space-x-4">
            <MdLogout size={22} />
            <span className="text-base font-medium">Cerrar Sesión</span>
          </div>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
