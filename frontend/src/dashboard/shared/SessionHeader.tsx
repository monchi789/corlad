import { useEffect, useState } from "react";
import persona from "../../assets/web/person_perfil.webp";
import { FaRegCalendar } from "react-icons/fa6";

export function SessionHeader() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="flex flex-row w-full justify-between text-white font-nunito font-semibold bg-[#007336] shadow-custom rounded-3xl px-10 py-5">
      <div className="flex flex-row space-x-5 my-auto">
        <div className="flex flex-row space-x-2">
          <FaRegCalendar className="my-auto" />
          <span>{currentDate}</span>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        <img className="size-10" src={persona} alt="Vacio persona" />
        <p className="text-[#ECF6E8] font-nunito font-bold my-auto">Usuario</p>
      </div>
    </div>
  );
}
