import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import AccesoRapido from "./AccesoRapido";
import login_img from '../../../assets/dashboard/login_img.png';

export default function InicioAdmin() {
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-row w-full space-x-5 mt-5 mb-24">
          <div className="flex flex-row w-2/3 relative text-white bg-[#007336] rounded-xl px-5 pb-5 pt-10">
            <div className="flex flex-col font-nunito z-10 space-y-3">
              <p className="text-4xl font-bold">Hola administrador!</p>
              <p className="text-xl">Nos alegra verte de nuevo</p>
            </div>
            <img
              className="w-2/5 absolute right-0 top-0 transform translate-x-1/5 -translate-y-1/4"
              src={login_img}
              alt="imagen"
            />
          </div>
          <div className="w-1/3 text-white font-nunito font-bold bg-[#007336] rounded-xl p-5">
            <span>Proximamente...</span>
          </div>
        </div>
        <AccesoRapido />
      </div>
    </div>
  )
}
