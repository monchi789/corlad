import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import { Divider } from 'primereact/divider';
import { useEffect, useState } from "react";
import { Categoria } from "../../interfaces/Categoria";
import { getAllCategorias } from "../../shared/api/categoria.api";
import { HorizontalCard } from "../shared/Cards";
import { Noticia } from "../../interfaces/Noticia";
import { getAllNoticias, getNoticiasByFilter } from "../../shared/api/noticia.api";

export function Noticias() {
  const [categoriaData, setCategorias] = useState<Categoria[]>([]);
  const [noticiasList, setNoticiasList] = useState<Noticia[]>([]);

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

  // Manejo del api de todas las noticias 
  useEffect(() => {
    async function cargarNoticias() {
      const res = await getAllNoticias();
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
      setNoticiasList(noticias);
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

  // Manejo de la selección de categoría
  const handleCategoriaClick = async (categoria: string) => {
    const params = `?categoria=${categoria}`;

    try {
      const response = await getNoticiasByFilter(params);
      const noticias: Noticia[] = response.data.map((noticia: any) => ({
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
      setNoticiasList(noticias);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container flex flex-col my-48 mx-auto">
        <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center mb-24">NOTICIAS</h1>
        <div className="flex flex-col lg:flex-row mx-auto justify-center">
          <div className="flex flex-col w-1/6 mx-10 items-start px-5">
            <p className="font-nunito font-extrabold text-2xl text-[#00330A] mb-10">Categorías</p>
            <div className="flex flex-col items-start space-y-5">
              {categoriaData.map((element, index) => (
                <button key={index} className="py-5" onClick={() => handleCategoriaClick(element.nombre_categoria)}>{element.nombre_categoria}</button>
              ))}
            </div>
          </div>
          <div className="lg:w-4/6 mx-5 space-y-10 mb-24">
            {noticiasList.map((noticia, index) => (
              <div key={index}>
                <HorizontalCard 
                  imageSource={import.meta.env.VITE_API_URL_ALTER + noticia.imagen_publicacion}
                  imageAlt=""
                  cardTitle={noticia.titulo}
                  cardText={limitarContenido(noticia.contenido, 100)}
                  noticiaId={noticia.id}
                />
                <Divider className="border border-solid my-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
