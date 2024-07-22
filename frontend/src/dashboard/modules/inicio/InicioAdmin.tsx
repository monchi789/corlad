import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import AccesoRapido from "./AccesoRapido";
import login_img from '../../../assets/dashboard/login_img.png';

export function InicioAdmin() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-row w-full space-x-5 mt-5 mb-24">
          <div className="flex flex-row w-2/3 relative text-[#F1E9D0] bg-[#00330A] rounded-xl px-5 pb-5 pt-10">
            <div className="flex flex-col z-10 space-y-3">
              <p className="text-4xl">Hola administrador</p>
              <p>Nos alegra verte de nuevo</p>
            </div>
            <img
              className="w-1/2 absolute right-0 top-0 transform translate-x-1/5 -translate-y-1/4"
              src={login_img}
              alt="imagen"
            />
          </div>
          <div className="w-1/3 text-[#F9ECD9] font-nunito font-bold bg-[#5F4102] rounded-xl p-5">
            <p>Ahora</p>
            <p>5°c</p>
            <span>Tormentas</span>
          </div>
        </div>
        <AccesoRapido />
      </div>
    </div>
  )
}
