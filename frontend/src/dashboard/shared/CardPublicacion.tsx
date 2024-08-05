import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

interface CardProps {
  title: string;
  imagen: string;
  contenido: string;
  tipo: string;
  date: string;
}

export const CardPublicacion: React.FC<CardProps> = ({ title, imagen, tipo, date }) => {
  return (
    <>
      <div className="flex flex-col min-w-[300px] max-w-[300px] font-nunito shadow-black shadow-md rounded-lg overflow-hidden ">
        <img className="w-full h-48 object-cover" src={imagen} alt="" />
        <div className="m-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{tipo}</span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>
        <div className="flex justify-end p-2 border-t text-[#00330A] border-gray-200">
          <button className="text-xl ml-2 hover:text-gray-700"><FaEdit /></button>
          <button className="text-xl ml-2 hover:text-gray-700"><FaRegTrashAlt /></button>
        </div>
      </div>
    </>
  )
}