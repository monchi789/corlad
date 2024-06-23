import { Header } from "../../shared/components/Header";
import logo_corlad from '../../assets/corlad_logo.png'
import Slider from "./slider/Slider";
import Card from "../shared/Card";
import { Link } from "react-router-dom";
import 'react-image-gallery/styles/css/image-gallery.css'
import Carrousel from "./carousel/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "../../shared/components/Footer";
import { Contacto } from "../contactanos/contacto/Contacto";

import { Noticia } from "../../interfaces/Noticia";
import { getAllNoticias } from "../../shared/api/noticia.api";
import { useEffect, useState } from "react";

export function Inicio() {

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

  return (
    <div>
      <Header />

      <Slider />

      <div className="container mx-auto px-10">
        {/*INFORMACION INSTITUCIONAL*/}
        <div className="flex flex-row my-24 mx-auto w-4/5">
          <img className='w-1/4' src={logo_corlad} alt="Logotipo corlad" />
          <div className="flex flex-col justify-center ms-8">
            <h3 className="text-5xl font-extrabold">
              <span className="text-[#a67102]">INFORMACION</span>
              <br />
              <span className="text-[#00330A]">INSTITUCIONAL</span>
            </h3>
            <p className="text-xl my-5">
              En el CORLAD CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
              Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-5xl font-extrabold text-center">1589+</p>
                <p className="text-[#a67102] text-center">Colegiados</p>
              </div>
              <div className="flex flex-col mx-7">
                <p className="text-5xl font-extrabold text-center">12+</p>
                <p className="text-[#a67102] text-center">Convenios institucionales</p>
              </div>
              <div className="flex flex-col me-7">
                <p className="text-5xl font-extrabold text-center">10</p>
                <p className="text-[#a67102] text-center">Años sirviendo</p>
              </div>
            </div>
          </div>
        </div>

        {/*Nuestros servicios*/}
        <div className="flex flex-col my-24 mx-auto w-4/5">
          <h3 className="font-extrabold text-center text-4xl text-[#a67102] mb-32">NUESTROS SERVICIOS</h3>
          <div className="flex flex-row space-x-6 justify-between text-center mb-24">
            <div className="rounded-3xl w-2/5 py-10 px-8 bg-[#F0F0F0] relative pt-16">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img className="bg-[#090a09] w-24 h-24 p-5 rounded-full" src={logo_corlad} alt="Logo CORLAD" />
              </div>
              <h3 className="font-extrabold text-center text-xl mb-5">
                CONSULTAR <br /> COLEGIATURA
              </h3>
              <p className="text-center">Consulta tu información y tu estado de colegiatura.</p>
              <button className="mt-4 bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto">
                Más información →
              </button>
            </div>
            <div className="rounded-3xl w-2/5 py-10 px-8 bg-[#F0F0F0] relative pt-16">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img className="bg-[#090a09] w-24 h-24 p-5 rounded-full" src={logo_corlad} alt="Logo CORLAD" />
              </div>
              <h3 className="font-extrabold text-xl my-5">CONVENIOS</h3>
              <p>Convenios entre intituciones regionales e nacionales.</p>
              <button className="mt-4 bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto">
                Más información →
              </button>
            </div>
            <div className="rounded-3xl w-2/5 py-10 px-8 bg-[#F0F0F0] relative pt-16">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img className="bg-[#090a09] w-24 h-24 p-5 rounded-full" src={logo_corlad} alt="Logo CORLAD" />
              </div>
              <h3 className="font-extrabold text-xl my-5">COLEGIATURA</h3>
              <p>Información y requisitos necesarios para obtener  el registro único de colegiación.</p>
              <button className="mt-4 bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto">
                Más información →
              </button>
            </div>
            <div className="rounded-3xl w-2/5 py-10 px-8 bg-[#F0F0F0] relative pt-16">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img className="bg-[#090a09] w-24 h-24 p-5 rounded-full" src={logo_corlad} alt="Logo CORLAD" />
              </div>
              <h3 className="font-extrabold text-xl my-5">NOTICIAS</h3>
              <p>Mantente informado sobre nuestra institución y del sector profesional.</p>
              <button className="mt-4 bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto">
                Más información →
              </button>
            </div>
          </div>
        </div>

        {/*Nuestros aliados*/}
        <div className="flex flex-col items-center mx-auto">
          <h3 className="font-extrabold text-center text-4xl text-[#a67102] mb-24">NUESTROS ALIADOS</h3>
          <Carrousel />
        </div>

        {/*Noticias*/}
        <div className="flex flex-col items-center my-24 mx-auto">
          <h3 className="font-extrabold text-center text-4xl text-[#a67102] mb-24">NOTICIAS</h3>
          <div className="flex flex-wrap space-x-14 mb-12">
            {data.map((noticia, index) => (
              <Card key={index} imageSource={noticia.imagen_publicacion} imageAlt="" cardTitle={noticia.titulo} cardText={limitarContenido(noticia.contenido, 50)} cardUrl="" />
            ))}
          </div>
          <Link to={'/noticias'} className="font-extrabold bg-[#a67102] text-white px-8 py-1 rounded-lg">Ver Más</Link>
        </div>
      </div>

      <Contacto />

      <Footer />
    </div>
  )
}
