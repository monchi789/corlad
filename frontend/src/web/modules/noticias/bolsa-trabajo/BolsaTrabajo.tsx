import { Footer } from "../../../shared/Footer";
import { Header } from "../../../shared/Header";
import { Divider } from 'primereact/divider';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useEffect, useState } from "react";
import { HorizontalCard } from "../../../shared/Cards";
import { Publicacion } from "../../../../interfaces/model/Publicacion";
import { getBolsaTrabajo } from "../../../../api/publicacion.api";
import { classNames } from "primereact/utils";

export default function BolsaTrabajo() {
  const [noticiasList, setNoticiasList] = useState<Publicacion[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5); // Número de noticias por página

  // Función para cargar noticias con paginación
  const cargarNoticias = async () => {
    try {
      const res = await getBolsaTrabajo();
      setNoticiasList(res.data.results);
      setTotalRecords(res.data.count);
    } catch (error) {
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

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    cargarNoticias();
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
        <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center mb-24">Bolsa de trabajo</h1>
        <div className="flex flex-col justify-center lg:w-full mb-24 mx-10">
          {/* Noticias */}
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
                  imageSource={noticia.imagen_publicacion ? import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion : null}
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
      <Footer />
    </>
  );
}
