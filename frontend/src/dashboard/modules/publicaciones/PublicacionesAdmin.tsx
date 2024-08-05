import { useEffect, useState, useCallback } from "react";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Dropdown } from 'primereact/dropdown';
import { CardPublicacion } from "../../shared/CardPublicacion";
import { getAllPublicaciones } from "../../../api/noticia.api";
import { getAllCategorias } from '../../../api/categoria.api';
import { Publicacion } from "../../../interfaces/model/Publicacion";
import { Categoria } from '../../../interfaces/model/Categoria';
import { FaThLarge, FaList } from "react-icons/fa";

interface PublicacionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Publicacion[];
}

export function PublicacionesAdmin() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Por defecto es null
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [filteredPublicaciones, setFilteredPublicaciones] = useState<Publicacion[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categorias, setCategorias] = useState<{ label: string; value: number }[]>([]);

  const fetchPublicaciones = async () => {
    try {
      const response = await getAllPublicaciones();
      const data: PublicacionResponse = response.data;
      if (data && Array.isArray(data.results)) {
        setPublicaciones(data.results);
        setFilteredPublicaciones(data.results); // Inicialmente mostramos todas las publicaciones
      } else {
        console.error("Publicaciones response is not an array:", data);
        setPublicaciones([]);
        setFilteredPublicaciones([]);
      }
    } catch (error) {
      console.error('Error fetching publicaciones:', error);
      setPublicaciones([]);
      setFilteredPublicaciones([]);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await getAllCategorias();
      const categoriasData = response.data.map((categoria: Categoria) => ({
        label: categoria.nombre_categoria,
        value: categoria.id
      }));
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  const filterPublicaciones = useCallback(() => {
    let filtered = publicaciones;

    if (selectedOption !== null) {
      filtered = filtered.filter(pub => pub.id_categoria.id === selectedOption);
    }

    if (startDate) {
      filtered = filtered.filter(pub => new Date(pub.fecha_publicacion) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(pub => new Date(pub.fecha_publicacion) <= new Date(endDate));
    }

    setFilteredPublicaciones(filtered);
  }, [selectedOption, startDate, endDate, publicaciones]);

  useEffect(() => {
    fetchPublicaciones();
    fetchCategorias();
  }, []);

  useEffect(() => {
    filterPublicaciones();
  }, [selectedOption, startDate, endDate, publicaciones, filterPublicaciones]);

  const handleCategoryChange = (value: number | null) => {
    setSelectedOption(value);
    // Si no se selecciona ninguna categoría (value es null), muestra todas las publicaciones
    if (value === null) {
      setStartDate(null);
      setEndDate(null);
      setFilteredPublicaciones(publicaciones); // Muestra todas las publicaciones
    }
  };

  const itemCategoria = (option: { label: string; value: number }) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="mt-10 pb-5">
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold">Publicaciones</h4>
          <div className="w-full bg-[#EAF1E8] rounded-lg p-5 mt-5">
            <div className="flex flex-row justify-between mx-10">
              <div className="flex flex-col space-y-3">
                <span className="text-xl text-[#00330A] font-nunito font-bold">Categoría</span>
                <Dropdown
                  className="w-full text-[#5F4102] border-solid border-2 border-[#5F4102] rounded-xl items-center font-bold py-2 px-3"
                  panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                  value={selectedOption}
                  onChange={(e) => handleCategoryChange(e.value)}
                  options={categorias}
                  optionLabel="label"
                  placeholder="Selecciona una categoría"
                  itemTemplate={itemCategoria}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-xl text-[#00330A] font-nunito font-bold">Fecha de inicio</span>
                <input
                  type="date"
                  className="text-[#00330A] border-solid border-2 border-[#00330A] rounded-xl py-2 px-3"
                  value={startDate || ''}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-xl text-[#00330A] font-nunito font-bold">Fecha de fin</span>
                <input
                  type="date"
                  className="text-[#00330A] border-solid border-2 border-[#00330A] rounded-xl py-2 px-3"
                  value={endDate || ''}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-3">
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#007336] text-white' : 'bg-[#EAF1E8] text-[#00330A]'}`}
            onClick={() => setViewMode('grid')}
          >
            <FaThLarge />
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-[#007336] text-white' : 'bg-[#EAF1E8] text-[#00330A]'}`}
            onClick={() => setViewMode('list')}
          >
            <FaList />
          </button>
        </div>
        <div className="mt-5">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPublicaciones.length > 0 ? (
                filteredPublicaciones.map(publicacion => (
                  <CardPublicacion
                    key={publicacion.id}
                    title={publicacion.titulo}
                    imagen={`${import.meta.env.VITE_API_URL_ALTER}${publicacion.imagen_publicacion}`}
                    contenido={publicacion.contenido}
                    tipo={publicacion.id_categoria.nombre_categoria}
                    date={publicacion.fecha_publicacion}
                  />
                ))
              ) : (
                <p>No se encontraron publicaciones.</p>
              )}
            </div>
          ) : (
            <ul className="list-disc pl-5">
              {filteredPublicaciones.length > 0 ? (
                filteredPublicaciones.map(publicacion => (
                  <li key={publicacion.id} className="mb-3">
                    <h5 className="text-[#00330A] font-nunito font-bold">{publicacion.titulo}</h5>
                    <p className="text-[#007336] font-nunito">{publicacion.id_categoria.nombre_categoria}</p>
                    <p className="text-[#00330A] font-nunito">{publicacion.fecha_publicacion}</p>
                  </li>
                ))
              ) : (
                <p>No se encontraron publicaciones.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
