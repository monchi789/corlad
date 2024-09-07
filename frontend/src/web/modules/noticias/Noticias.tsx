import { Footer } from "../../shared/Footer";
import { Header } from "../../shared/Header";
import { Divider } from 'primereact/divider';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useEffect, useState } from "react";
import { Categoria } from "../../../interfaces/model/Categoria";
import { getAllCategorias } from "../../../api/categoria.api";
import { HorizontalCard } from "../../shared/Cards";
import { Publicacion } from "../../../interfaces/model/Publicacion";
import { getAllNoticiasByPage, getNoticiasByFilter } from "../../../api/publicacion.api";
import { classNames } from "primereact/utils";

export default function Noticias() {
  const [categoriaData, setCategorias] = useState<Categoria[]>([]);
  const [noticiasList, setNoticiasList] = useState<Publicacion[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5); // Número de noticias por página
  const [activeCategoria, setActiveCategoria] = useState<string | null>(null);

  // Manejo del api de todas las categorias de noticias
  useEffect(() => {
    async function cargarCategorias() {
      const res = await getAllCategorias();
      const categoriasList: Categoria[] = res.data.map((element: any) => ({
        id: element.id,
        nombre_categoria: element.nombre_categoria,
      }));
      setCategorias(categoriasList);
    }
    cargarCategorias();
  }, []);

  // Función para cargar noticias con paginación
  const cargarNoticias = async (page = 0, pageSize = rows) => {
    try {
      const res = await getAllNoticiasByPage(page, pageSize);
      setNoticiasList(res.data.results);
      setTotalRecords(res.data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Cargar noticias iniciales al iniciar el componente
  useEffect(() => {
    cargarNoticias();
  }, []);

  // Función para limitar el contenido de la Card de Noticias
  function limitarContenido(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return texto;
  }

  // Manejo de la selección de categoría
  const handleCategoriaClick = async (categoria: string) => {
    setActiveCategoria(categoria);
    const params = `?categoria=${categoria}&page=1&page_size=${rows}`;

    try {
      const res = await getNoticiasByFilter(params);
      setNoticiasList(res.data.results);
      setTotalRecords(res.data.count);
      setFirst(0); // Reinicia a la primera página
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    cargarNoticias(event.page, event.rows);
    window.scrollTo(0, 0);
  };

  // Template para el paginador
  const template = {
    layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    PageLinks: (options: any) => {

      const isActive = options.page === options.currentPage;

      return (
        <button
          className={classNames('px-3 py-1 mx-1 rounded-lg transition duration-300', {
            'bg-[#00330A] text-white': isActive,
            'bg-white text-black': !isActive
          })}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      )
    }
  };

  return (
    <>
      <Header />
      <div className="container flex flex-col my-40 mx-auto">
        <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center mb-24">NOTICIAS</h1>
        <div className="flex flex-col lg:flex-row mx-auto justify-center">
          {/* Categorías */}
          <div className="flex flex-col w-full lg:w-2/6 items-center lg:items-start px-5 lg:px-10">
            <p className="font-nunito font-extrabold text-2xl text-[#00330A] mb-6 lg:mb-10 px-3">Categorías</p>
            <div className="flex flex-col items-center lg:items-start space-y-5 w-full">
              {categoriaData.map((element, index) => (
                <button
                  key={index}
                  className={classNames('w-full text-left transition duration-300 p-3 rounded-md', {
                    'bg-[#00330A] text-white': activeCategoria === element.nombre_categoria,
                    'hover:bg-[#00330A] hover:text-white': activeCategoria !== element.nombre_categoria,
                    'bg-white text-black': activeCategoria !== element.nombre_categoria,
                  })}
                  onClick={() => handleCategoriaClick(element.nombre_categoria)}
                >
                  {element.nombre_categoria}
                </button>
              ))}
            </div>
          </div>

          {/* Noticias */}
          <div className="lg:w-5/6 space-y-10 mb-24 mx-5 lg:mx-0">
            {noticiasList.length === 0 ? (
              // Contenedor responsivo para cuando no hay noticias disponibles
              <div className="flex flex-col items-center text-center text-xl text-gray-500 ms-10 py-10">
                <p className="mb-5">No hay publicaciones disponibles todavía.</p>
                <p className="text-base text-gray-400">Por favor, verifica más tarde.</p>
              </div>
            ) : (
              noticiasList.map((noticia, index) => (
                <div key={index}>
                  <HorizontalCard
                    imageSource={import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion}
                    imageAlt={noticia.titulo}
                    cardTitle={noticia.titulo}
                    cardText={limitarContenido(noticia.contenido, 100)}
                    cardDate={noticia.fecha_publicacion}
                    noticiaId={noticia.id}
                  />
                  <Divider className="border border-solid my-10" />
                </div>
              ))
            )}
            {/* Paginador */}
            {noticiasList.length > 0 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                className="space-x-5"
                template={template}
              />
            )}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
