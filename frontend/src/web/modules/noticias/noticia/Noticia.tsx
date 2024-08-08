import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../../shared/Footer';
import { Header } from '../../../shared/Header';
import { defaultPublicacion, Publicacion } from '../../../../interfaces/model/Publicacion';
import { getAllNoticiasByPage, getNoticiasById } from '../../../../api/publicacion.api';
import { Card } from '../../../shared/Cards';
import { FaFilePdf } from 'react-icons/fa6';

export function Noticia() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Publicacion>(defaultPublicacion);
  const [data, setData] = useState<Publicacion[]>([]);

  useEffect(() => {
    async function cargarNoticias() {
      const res = await getAllNoticiasByPage();
      const noticias: Publicacion[] = res.data.results.map((noticia: any) => ({
        id: noticia.id,
        titulo: noticia.titulo,
        contenido: noticia.contenido,
        fecha_publicacion: noticia.fecha_publicacion,
        imagen_publicacion: noticia.imagen_publicacion,
        documento: noticia.documento,
        id_categoria: {
          id: noticia.id_categoria.id,
          nombre_categoria: noticia.id_categoria.nombre_categoria
        }
      }));
      setData(noticias);
    }
    cargarNoticias();
  }, []);

  function limitarContenido(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return texto;
  }

  const extractFileName = (path: string) => {
    // Extrae el nombre del archivo del path
    return path.split('/').pop();
  };

  useEffect(() => {
    async function cargarNoticia() {
      try {
        const res = await getNoticiasById(id);
        setNoticia(res.data);
      } catch (error) {
        console.error('Error fetching noticia:', error);
      }
    }
    cargarNoticia();
  }, [id]);

  if (!noticia) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container lg:w-5/6 xl:w-2/3 flex flex-col space-y-10 mx-auto mt-36">
        <img
          className="w-full min-w-[280px] max-h-[500px] object-cover lg:rounded-3xl"
          src={import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion}
          alt={noticia.titulo}
        />
        <h3 className="text-3xl text-[#09853C] text-center font-nunito font-extrabold mx-5 lg:mx-0">
          {noticia.titulo}
        </h3>
        <p
          className="text-[#363636] text-start text-xl font-didact mx-5 lg:mx-0 no-tailwind-base"
          dangerouslySetInnerHTML={{ __html: noticia.contenido }}
        />

        {/* Enlace al documento y previsualización */}
        {noticia.documento && (
          <div className="flex flex-col space-y-3 mt-4">
            <a
              href={`${import.meta.env.VITE_API_URL_ALTER}${noticia.documento}`}
              className="flex flex-row space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf className="my-auto" />
              <span>Ver documento adjunto</span>
            </a>
            <span className="text-sm">{extractFileName(noticia.documento)}</span>
          </div>
        )}
      </div>

      <div className="container lg:w-5/6 xl:w-2/3 lg:mx-auto my-12">
        <h4 className="text-2xl text-[#A67102] font-nunito font-extrabold mx-5 lg:mx-0">
          Otras noticias
        </h4>
        <div className="flex flex-col my-12 mx-5 lg:mx-auto">
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-3 xl:space-x-14 mb-12">
            {data.slice(0, 3).map((noticia, index) => (
              <Card
                key={index}
                imageSource={import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion}
                imageAlt={noticia.titulo}
                cardTitle={noticia.titulo}
                cardText={limitarContenido(noticia.contenido, 30)}
                noticiaId={noticia.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
