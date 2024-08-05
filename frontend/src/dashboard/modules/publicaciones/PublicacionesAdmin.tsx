import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Dropdown } from 'primereact/dropdown';
import { CardPublicacion } from "../../shared/CardPublicacion";
import { getAllPublicaciones } from "../../../api/noticia.api";
import { Publicacion } from "../../../interfaces/model/Publicacion";
import { IoMdAddCircleOutline } from "react-icons/io";

export function PublicacionesAdmin() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])

  const options = [
    { label: 'Dni', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  const fetchPublicaciones = async () => {
    try {
      const res = await getAllPublicaciones();
      setPublicaciones(res.data.results)
    } catch {

    }
  }

  useEffect(() => {
    fetchPublicaciones()
  }, [])

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col space-y-5 my-10">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Publicaciones</h4>
            <div className="flex flex-row space-x-3">
              <Link to={"/admin/publicaciones/nueva-publicacion"}>
                <button className="flex flex-row bg-[#007336] text-xl text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black	shadow-md rounded-2xl transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-4 px-8 py-2">
                  <IoMdAddCircleOutline size={"30px"} />
                  <span className="my-auto">Nueva publicacion</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#EAF1E8] rounded-lg p-5 my-5">
          <div className="flex flex-row justify-between space-x-10 mx-5">
            <div className="flex flex-col w-1/3 space-y-2">
              <span className="text-xl text-[#00330A] font-nunito font-bold">Categoria</span>
              <Dropdown
                className="w-full text-[#5F4102] border-solid border-2 border-[#5F4102] rounded-xl items-center font-bold py-1 px-3"
                panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.value)}
                options={options}
                optionLabel="label"
                placeholder="Buscar por..."
                itemTemplate={itemCategoria}
              />
            </div>
            <div className="flex flex-col w-2/3 space-y-3">
              <span className="text-xl text-[#00330A] font-nunito font-bold">Fecha de publicación</span>
              <div className="flex flex-row justify-between space-x-10">
                <input className="w-full" type="date" />
                <input className="w-full" type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-grow gap-x-4">
          {publicaciones.map((element) => (
            <CardPublicacion key={element.id} title={element.titulo} imagen={`${import.meta.env.VITE_API_URL_ALTER}${element.imagen_publicacion}`} contenido={element.contenido} tipo={element.id_categoria.nombre_categoria} date={element.fecha_publicacion} />
          ))}
        </div>
      </div>
    </div>
  )
}
