import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { AiFillNotification } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logo_corlad from "../../assets/web/corlad_logo_blanco.png"

export function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { hasGroup, logout } = useAuth(); // Usamos el hook useAuth para acceder a las funciones del contexto

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    // Aquí podrías añadir una redirección a la página de login si es necesario
  };

  return (
    <div className="w-1/5 h-dvh bg-[#007336] rounded-2xl shadow-2xl m-3 p-3">
      <div className="flex flex-col w-full font-nunito text-2xl">
        <img className="w-3/6 justify-center mx-auto" src={logo_corlad} alt="Logo del corlad cusco" />
        <h1 className="text-center text-[#F1E9D0] font-black m-5">CORLAD - CUSCO</h1>
        <ul className="flex flex-col w-full justify-between">
          <Link to={"/admin"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <AiFillHome size={"30px"} />
              <span className="my-auto">Inicio</span>
            </li>
          </Link>

          {hasGroup('publicador') && (
            <>
              <li className="flex flex-col text-[#ECF6E8] hover:text-[#F1E9D0] transition duration-300 mx-5 mb-5">
                <div
                  className="flex flex-row justify-between space-x-4 rounded-lg p-3 cursor-pointer hover:bg-[#5F4102]"
                  onClick={toggleDropdown}
                >
                  <div className="flex flex-row space-x-4">
                    <PiNewspaperClippingFill size={"30px"} />
                    <span className="my-auto">Publicaciones</span>
                  </div>
                  {isDropdownOpen ? (
                    <IoIosArrowUp className="my-auto" size={"30px"} />
                  ) : (
                    <IoIosArrowDown className="my-auto" size={"30px"} />
                  )}
                </div>
                {isDropdownOpen && (
                  <ul className="flex flex-col space-y-2 pl-12 pt-2">
                    <Link to={"/admin/publicaciones"}>
                      <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                        <span className="my-auto">Publicaciones</span>
                      </li>
                    </Link>
                    <Link to={"/admin/publicaciones/lista"}>
                      <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] rounded-lg transition duration-300 p-2">
                        <span className="my-auto">Categorias</span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>

              <Link to={"/admin/anuncios"}>
                <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
                  <AiFillNotification size={"30px"} />
                  <span className="my-auto">PopUps</span>
                </li>
              </Link>
              
              <Link to={"/admin/galeria"}>
                <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
                  <IoMdImages size={"30px"} />
                  <span className="my-auto">Sliders</span>
                </li>
              </Link>
            </>
          )}

          {hasGroup('secretaria') && (
            <>
              <Link to={"/admin/colegiado"}>
                <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
                  <FaUsers size={"30px"} />
                  <span className="my-auto">Colegiados</span>
                </li>
              </Link>

              <Link to={"/admin/escuelas"}>
                <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
                  <IoSchoolSharp size={"30px"} />
                  <span className="my-auto">Escuelas</span>
                </li>
              </Link>
            </>
          )}
        </ul>
        <li onClick={handleLogout} className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3 cursor-pointer">
          <MdLogout size={"30px"} />
          <span className="my-auto">Salir</span>
        </li>
      </div>
    </div>
  );
}