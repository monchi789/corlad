import { useEffect, useState } from "react";
import persona from "../../../../assets/web/person_perfil.webp";
import { FaRegCalendar } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";

export function SessionHeader() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const { user } = useAuth(); // Usa el hook para obtener el usuario

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setCurrentDate(formattedDate);
  }, []);

  const capitalize = (str:string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-row w-full justify-between text-white font-nunito font-semibold bg-[#007336] shadow-custom-input rounded-lg px-5 py-2">
      <div className="flex flex-row space-x-5 my-auto">
        <div className="flex flex-row space-x-2">
          <FaRegCalendar className="my-auto" />
          <span>{currentDate}</span>
        </div>
      </div>
      <div className="flex flex-row">
        <img className="size-10" src={persona} alt="Persona default" />
        <p className="text-md font-bold my-auto ms-2">{capitalize(user?.username as string) || 'Administrador'}</p>
      </div>
    </div>
  );
}
