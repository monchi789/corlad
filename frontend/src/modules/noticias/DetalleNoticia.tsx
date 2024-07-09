import { useParams } from 'react-router-dom';
import { Footer } from '../../shared/components/Footer'
import { Header } from '../../shared/components/Header'
import { useEffect, useState } from 'react';
import { defaultNoticia, Noticia } from '../../interfaces/Noticia';
import { getNoticiasById } from '../../shared/api/noticia.api';

export function DetalleNoticia() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<Noticia>(defaultNoticia);

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
      <div className="container flex flex-col items-center mx-auto">
        <img className="w-2/3 object-cover rounded" src={import.meta.env.VITE_API_URL_ALTER+noticia.imagen_publicacion} alt="" />
        <h3 className="text-3xl text-[#A67102] font-nunito font-extrabold">{noticia.titulo}</h3>
        <p>{noticia.contenido}</p>
      </div>
      <Footer />
    </>
  )
} 
