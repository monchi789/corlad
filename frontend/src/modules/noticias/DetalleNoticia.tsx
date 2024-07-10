import { useParams } from 'react-router-dom';
import { Footer } from '../../shared/components/Footer'
import { Header } from '../../shared/components/Header'
import { useEffect, useState } from 'react';
import { defaultNoticia, Noticia } from '../../interfaces/Noticia';
import { getAllNoticias, getNoticiasById } from '../../shared/api/noticia.api';
import { Card } from '../shared/Cards';

export function DetalleNoticia() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Noticia>(defaultNoticia);
  const [data, setData] = useState<Noticia[]>([]);

  useEffect(() => {
    async function cargarNoticias() {
      const res = await getAllNoticias();

      /*
        Mapeo del api 
      */
      const noticias: Noticia[] = res.data.map((noticia: any) => ({
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

  /*
    Limitar el contenido de la Card de Noticias
  */
  function limitarContenido(texto: string, limitePalabras: number): string {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return texto;
  }


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
      <Header/>
      <div className="container lg:w-5/6 xl:w-2/3 flex flex-col items-center space-y-10 mx-auto mt-36">
        <img className="w-full min-w-[280px] max-h-[500px] object-cover lg:rounded-3xl" src={import.meta.env.VITE_API_URL_ALTER+noticia.imagen_publicacion} alt="" />
        <h3 className="text-3xl text-[#09853C] font-nunito font-extrabold mx-5 lg:mx-0">{noticia.titulo}</h3>
        <p className="text-[#363636] text-xl font-didact mx-5 lg:mx-0" dangerouslySetInnerHTML={{ __html: noticia.contenido }}/>
      </div>

      <div className="container lg:w-5/6 xl:w-2/3 lg:mx-auto my-12">
        <h4 className="text-2xl text-[#A67102] font-nunito font-extrabold mx-5 lg:mx-0">Otras noticias</h4>
        <div className="flex flex-col my-12 mx-5 lg:mx-auto">
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-3 xl:space-x-14 mb-12">
            {data.map((noticia, index) => (
              <Card key={index} imageSource={import.meta.env.VITE_API_URL_ALTER+noticia.imagen_publicacion} imageAlt="" cardTitle={noticia.titulo} cardText={limitarContenido(noticia.contenido, 30)} noticiaId={0} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 
