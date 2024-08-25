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
    <div className="flex flex-row w-full justify-between text-white font-nunito font-semibold bg-[#007336] shadow-custom-input rounded-2xl px-7 py-2">
      <div className="flex flex-row space-x-5 my-auto">
        <div className="flex flex-row space-x-2">
          <FaRegCalendar className="my-auto" />
          <span>{currentDate}</span>
        </div>
      </div>
      <div className="flex flex-row">
        <img className="size-10" src={persona} alt="Persona default" />
      </div>
    </div>
  );
}
