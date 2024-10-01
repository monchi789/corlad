import { useAuth } from '../../contexts/AuthContext'; // Asegúrate de importar correctamente
import AccesoRapido from "./AccesoRapido";

export default function InicioAdmin() {
  const { user } = useAuth(); // Usa el hook para obtener el usuario

  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div className="flex flex-row w-full space-x-5 my-10">
        <div className="flex flex-row w-full relative text-white bg-[#007336] rounded-xl px-5 pb-5 pt-10">
          <div className="flex flex-col font-nunito z-10 space-y-3">
            <p className="text-4xl font-bold">Hola {capitalize(user?.username as string) || 'Administrador'}!</p>
            <p className="text-xl">Nos alegra verte de nuevo</p>
          </div>
        </div>
      </div>
      <AccesoRapido />
    </>
  );
}
