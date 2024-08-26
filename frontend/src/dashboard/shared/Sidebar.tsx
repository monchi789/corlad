import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDropdown } from "../contexts/DropdownContext";
import { AiFillHome, AiFillNotification } from "react-icons/ai";
import { FaUsers, FaMoneyCheck } from "react-icons/fa";
import { IoSchoolSharp, IoImages } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLogout, MdMenu } from "react-icons/md";
import { PiNewspaperClippingFill } from "react-icons/pi";
import logo_corlad from "../../assets/web/corlad_logo_blanco.png";


interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export function Sidebar() {
  const { dropdownStates, toggleDropdown } = useDropdown();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { hasGroup, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => logout();

  const MenuItem: React.FC<MenuItemProps> = ({ to, icon, text }) => (
    <Link to={to}>
      <li className="flex flex-row text-[#ECF6E8] text-xl hover:bg-[#CCB23A] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-2 p-3">
        {icon}
        <span className="my-auto">{text}</span>
      </li>
    </Link>
  );

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 text-white bg-[#007336] p-2 rounded-md xl:hidden"
        onClick={toggleSidebar}
      >
        <MdMenu size={24} />
      </button>
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:relative xl:translate-x-0 transition duration-200 ease-in-out xl:w-1/5 w-64 h-svh bg-[#007336] rounded-2xl shadow-custom m-3 p-3 mb-10 overflow-y-auto z-40 flex flex-col`}>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col w-full font-nunito text-xl">
            <img className="w-3/6 justify-center mx-auto" src={logo_corlad} alt="Logo del corlad cusco" />
            <h2 className="text-xl text-center text-[#F1E9D0] font-black m-5">CORLAD CUSCO</h2>
            <ul className="flex flex-col w-full justify-between">

              <MenuItem to="/admin" icon={<AiFillHome size={25} />} text="Inicio" />

              {hasGroup('secretaria', 'admin') && (
                <>
                  <MenuItem to="/admin/colegiado" icon={<FaUsers size={25} />} text="Colegiados" />
                  <MenuItem to="/admin/capitulos" icon={<IoSchoolSharp size={25} />} text="Capítulos" />

                  <li className="flex flex-col text-[#ECF6E8] hover:text-[#F1E9D0] transition duration-300 mx-5 mb-2">
                    <div
                      className="flex flex-row justify-between space-x-4 rounded-lg p-3 cursor-pointer hover:bg-[#CCB23A]"
                      onClick={() => toggleDropdown("pagos")}
                    >
                      <div className="flex flex-row space-x-4">
                        <FaMoneyCheck size={25} />
                        <span className="my-auto">Pagos</span>
                      </div>
                      {dropdownStates.pagos ? (
                        <IoIosArrowUp className="my-auto" size={25} />
                      ) : (
                        <IoIosArrowDown className="my-auto" size={25} />
                      )}
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${dropdownStates.pagos ? 'max-h-screen' : 'max-h-0'}`}>
                      <ul className="flex flex-col text-xl space-y-2 pl-12 pt-2">
                        <Link to={"/admin/pagos"}>
                          <li className="flex flex-row text-[#ECF6E8] hover:bg-[#CCB23A] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                            <span className="my-auto">Pagos</span>
                          </li>
                        </Link>
                        <Link to={"/admin/pagos/estado-cuenta"}>
                          <li className="flex flex-row text-[#ECF6E8] hover:bg-[#CCB23A] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                            <span className="my-auto">Estados de cuenta</span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </>
              )}

              {hasGroup('publicador', 'admin') && (
                <>
                  <li className="flex flex-col text-[#ECF6E8] text-xl hover:text-[#F1E9D0] transition duration-300 mx-5 mb-2">
                    <div
                      className="flex flex-row justify-between space-x-4 rounded-lg p-3 cursor-pointer hover:bg-[#CCB23A]"
                      onClick={() => toggleDropdown("publicaciones")}
                    >
                      <div className="flex flex-row space-x-4">
                        <PiNewspaperClippingFill size={25} />
                        <span className="my-auto">Publicaciones</span>
                      </div>
                      {dropdownStates.publicaciones ? (
                        <IoIosArrowUp className="my-auto" size={25} />
                      ) : (
                        <IoIosArrowDown className="my-auto" size={25} />
                      )}
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${dropdownStates.publicaciones ? 'max-h-screen' : 'max-h-0'}`}>
                      <ul className="flex flex-col text-xl space-y-2 pl-12 pt-2">
                        <Link to={"/admin/publicaciones"}>
                          <li className="flex flex-row text-[#ECF6E8] hover:bg-[#CCB23A] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                            <span className="my-auto">Publicaciones</span>
                          </li>
                        </Link>
                        <Link to={"/admin/publicaciones/categorias"}>
                          <li className="flex flex-row text-[#ECF6E8] hover:bg-[#CCB23A] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                            <span className="my-auto">Categorias</span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </li>

                  <MenuItem to="/admin/anuncios" icon={<AiFillNotification size={25} />} text="Anuncios" />
                  <MenuItem to="/admin/galeria" icon={<IoImages size={25} />} text="Galerías" />
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <li onClick={handleLogout} className="flex flex-row text-[#ECF6E8] text-xl hover:bg-[#CCB23A] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-2 p-3 cursor-pointer">
            <MdLogout size={25} />
            <span className="my-auto">Cerrar Sesión</span>
          </li>
        </div>
      </div>
    </>
  );
}
