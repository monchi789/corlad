import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import AccesoRapido from "./AccesoRapido";

export function InicioAdmin() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />
      <div className="w-3/4 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-row w-full space-x-5 mt-5">
          <div className="flex flex-row text-[#F1E9D0] w-2/3 bg-[#00330A] rounded-xl p-3">
            <div className="flex flex-col">
              <p className="text-4xl">Hola usuario</p>
              <p>Nos alegra verte de nuevo</p>
            </div>
            <img src="" alt="" />
          </div>
          <div className="w-1/3 bg-[#5F4102] rounded-xl p-3">
            <p>Ahora</p>
            <p>5°c</p>

          </div>
        </div>
        <AccesoRapido />
      </div>
    </div>
  )
}
