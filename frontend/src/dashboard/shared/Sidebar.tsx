import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";

export function Sidebar() {
  return (
    <div className="w-1/4 h-svh bg-[#00330A] rounded-2xl shadow-2xl m-3 p-3">
      <div className="flex flex-col font-nunito text-2xl">
        <h1 className="text-center text-[#F1E9D0] font-black m-10">CORLAD</h1>
        <ul className="w-full space-y-5">
          <Link to={"/admin"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <AiFillHome size={"30px"}/>
              <span className="my-auto">Inicio</span>
            </li>
          </Link>
          <Link to={"/admin/colegiado"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <FaUsers size={"30px"}/>
              <span className="my-auto">Colegiados</span>
            </li>
          </Link>
          <Link to={"/admin/escuelas"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <IoSchoolSharp size={"30px"}/>
              <span className="my-auto">Escuelas</span>
            </li>
          </Link>
          <Link to={"/admin/escuelas"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <IoSchoolSharp size={"30px"}/>
              <span className="my-auto">PopUps</span>
            </li>
          </Link>
          <Link to={"/admin/escuelas"}>
            <li className="flex flex-row text-[#ECF6E8] hover:bg-[#5F4102] hover:text-[#F1E9D0] space-x-4 rounded-lg transition duration-300 mx-5 mb-5 p-3">
              <IoSchoolSharp size={"30px"}/>
              <span className="my-auto">Sliders</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}
