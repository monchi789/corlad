
interface CardProps {
  title: string;
  imagen: string;
  contenido: string;
  tipo: string;
  date: string;
}

export const CardPublicacion: React.FC<CardProps> = ({ title, imagen, contenido, tipo, date }) => {
  return (
    <>
      <div className="w-[300px] font-nunito border border-gray-300 rounded-lg overflow-hidden ">
        <div className="h-[150px] flex items-center justify-center">
          <img className="object-cover" src={imagen} alt="" />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-2">{contenido}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{tipo}</span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>
        <div className="flex justify-end p-2 border-t border-gray-200">
          <button className="text-xl ml-2 hover:text-gray-700">✏️</button>
          <button className="text-xl ml-2 hover:text-gray-700">🗑️</button>
        </div>
      </div>
    </>
  )
}