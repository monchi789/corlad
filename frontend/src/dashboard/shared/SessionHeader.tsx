import persona from "../../assets/web/person_perfil.webp"
import { FaRegCalendar } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

export function SessionHeader() {
  return (
    <div className="flex flex-row w-full justify-between text-[#F1E9D0] font-nunito font-semibold bg-[#007336] rounded-3xl px-10 py-5">
      <div className="flex flex-row space-x-5 my-auto">
        <div className="flex flex-row space-x-2">
          <FaRegCalendar className="my-auto" />
          <span>Martes, 9 Julio</span>
        </div>
        <div className="flex flex-row space-x-2">
          <FaMapMarkerAlt className="my-auto" />
          <span>Cusco Perú</span>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        <img className="size-10" src={persona} alt="Vacio persona" />
        <p className="text-[#ECF6E8] font-nunito font-bold my-auto">Usuario</p>
      </div>
    </div>
  )
}
