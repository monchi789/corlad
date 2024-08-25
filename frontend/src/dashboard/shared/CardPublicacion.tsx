import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  imagen: string;
  contenido: string;
  tipo: string;
  date: string;
  onDelete: (id: number) => void;
}

export const CardPublicacion: React.FC<CardProps> = ({ id, title, imagen, tipo, date, onDelete }) => {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[200px] font-nunito shadow-black shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-36 object-cover" src={imagen} alt="" />
      <div className="flex flex-col flex-grow m-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500">{tipo}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
      <div className="flex justify-end text-[#00330A] border-t border-gray-200 mt-auto p-2">
        <button className="text-xl ml-2 hover:text-gray-700">
          <Link to={`/admin/publicaciones/editar-publicacion/${id}`}>
            <FaEdit />
          </Link>
        </button>
        <button className="text-xl ml-2 hover:text-gray-700" onClick={() => onDelete(id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};
