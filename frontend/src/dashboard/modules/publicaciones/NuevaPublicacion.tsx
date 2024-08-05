import { useEffect, useState } from "react";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Dropdown } from "primereact/dropdown";
import { Categoria } from "../../../interfaces/model/Categoria";
import { getAllCategoriasAdmin } from "../../../api/categoria.api";

export function NuevaPublicacion() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [categorias, setCategorias] = useState<Categoria[]>([])

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

  const fetchCategoria = async () => {
    const res = await getAllCategoriasAdmin();
    setCategorias(res.data)
  }

  useEffect(() => {
    fetchCategoria()
  }, [])

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col space-y-5 my-10">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Nueva publicación</h4>
          </div>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg space-y-2 p-5">
              <span className="text-lg text-[#00330A] font-nunito font-extrabold">Título</span>
              <textarea className="h-full bg-[#ECF6E8] border-2 border-[#5F4102] focus:outline-none shadow-custom-input resize-none rounded-lg p-3" />
            </div>
            <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg space-y-5 p-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="categoria" className="text-lg text-[#00330A] font-nunito font-extrabold">Categoría</label>
                <Dropdown
                  id="categoria"
                  className="w-full text-[#5F4102] border-solid border-2 border-[#5F4102] rounded-lg items-center font-bold py-1 px-3"
                  panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.value)}
                  options={categorias.map(element => ({
                    label: element.nombre_categoria,
                    value: element.id
                  }))}
                  optionLabel="label"
                  placeholder="Elegir categoría..."
                  itemTemplate={itemCategoria}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fecha" className="text-lg text-[#00330A] font-nunito font-extrabold">Fecha</label>
                <input id="fecha" name="fecha" type="date" className="text-a font-nunito font-extrabold border-2 border-[#5F4102] rounded-lg py-1 px-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-10 mt-10">
            <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg space-y-2 p-5">
              <span className="text-lg text-[#00330A] font-nunito font-extrabold">Contenido</span>
              <input type="text" />
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg p-5">
                <div className="flex flex-col">
                  <img src="" alt="" />
                  <span className="text-lg text-[#00330A] font-nunito font-extrabold">Imagen de la publicación</span>
                  <span>Modificar</span>
                  <input type="file" />

                </div>
              </div>
              <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg p-5">
                <div className="flex flex-col space-y-2">
                  <span className="text-lg text-[#00330A] font-nunito font-extrabold">Documento adjunto</span>
                  <input type="file" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-end text-lg font-nunito font-extrabold mt-10 space-x-10">
            <button className="w-2/6 text-white bg-[#007336] rounded-2xl p-2">Crear nueva publicación</button>
            <button className="w-1/6 rounded-2xl text-[#5F4102] border border-[#5F4102] p-2">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}