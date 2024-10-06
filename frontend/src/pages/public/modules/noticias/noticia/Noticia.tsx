import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../../components/shared/Footer';
import { Header } from '../../../components/shared/Header';
import { defaultPublicacion, Publicacion } from '../../../../../interfaces/model/Publicacion';
import { getAllNoticiasByPage, getNoticiasById } from '../../../../../api/publicacion.api';
import { Card } from '../../../components/Cards';
import { FaFilePdf } from 'react-icons/fa6';

export default function Noticia() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Publicacion>(defaultPublicacion);
  const [data, setData] = useState<Publicacion[]>([]);

  useEffect(() => {
    async function cargarNoticias() {
      const res = await getAllNoticiasByPage();
      setData(res.data.results);
    }
    cargarNoticias();
  }, []);

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
      <article className="flex flex-col space-y-10 mx-auto mt-24">
        <figure>

          <img
            className="w-full min-w-[280px] max-h-[500px] object-cover lg:rounded-lg"
            src={import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion}
            alt={noticia.titulo}
          />
        </figure>

        <div className='container lg:w-5/6 xl:w-2/3 space-y-5 mx-auto'>
          <h3 className="text-3xl text-default-green text-center font-nunito font-extrabold mx-5 lg:mx-0">
            {noticia.titulo}
          </h3>

          <section>
            <p
              className="text-[#363636] text-start text-xl font-didact mx-5 lg:mx-0 no-tailwind-base"
              dangerouslySetInnerHTML={{ __html: noticia.contenido }}
            />
          </section>

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

      </article>

      <div className="container lg:w-5/6 xl:w-2/3 space-y-5 lg:mx-auto my-12">
        <span className="text-2xl text-[#A67102] font-nunito font-extrabold mx-5 lg:mx-0">
          Otras noticias
        </span>
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch space-y-10 lg:space-y-0 lg:space-x-5">
            {data.slice(0, 3).map((noticia, index) => (
              <Card
                key={index}
                imageSource={noticia.imagen_publicacion ? import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion : null}
                imageAlt={noticia.titulo}
                cardTitle={noticia.titulo}
                cardText={noticia.contenido}
                date={noticia.fecha_publicacion}
                category={noticia.id_categoria.nombre_categoria}
                noticiaId={noticia.id}
              />
            ))}
          </div>
      </div>
      <Footer />
    </>
  );
}
