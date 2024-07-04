import { Header } from "../../shared/components/Header";
import logo_corlad from '../../assets/corlad_logo.png'
import Card from "../shared/Cards";
import { Link } from "react-router-dom";
import 'react-image-gallery/styles/css/image-gallery.css'
import Carrousel from "./../shared/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "../../shared/components/Footer";
import { Contacto } from "../contactanos/contacto/Contacto";
import { Noticia } from "../../interfaces/Noticia";
import { getAllNoticias } from "../../shared/api/noticia.api";
import { useEffect, useState } from "react";
import { Servicios } from "./servicios/Servicios";
import { PopUps } from "../shared/PopUps";
import background from "../../assets/machupicchu.jpg"
import { Gallery } from "../shared/Gallery";
import logo_corlad_blanco from '../../assets/corlad_logo_blanco.png'

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

      <div className='relative mt-28 xl:mt-32'>
      <div className='container flex flex-col md:flex-row mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full justify-center items-center'>
        <img className='w-4/6 md:w-2/4 xl:w-2/6' src={logo_corlad_blanco} alt="Logotipo corlad" />
        <div className='w-2/4 mt-5 md:my-auto md:me-24 flex flex-col justify-center items-center'>
          <h1 className="text-white text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold font-mukta leading-loose md:leading-loose lg:leading-loose xl:leading-loose">
            COLEGIO REGIONAL DE LICENCIADOS EN ADMINISTRACIÓN <br />
            <span className='text-2xl lg:text-4xl'>CORLAD - CUSCO</span>
          </h1>
        </div>
      </div>
      <Gallery />
      </div>
      
      <div className="container mx-auto md:px-10">
        {/*INFORMACION INSTITUCIONAL*/}
        <div className="flex md:flex-col lg:flex-row items-center my-24 mx-auto w-4/5">
          <img className='md:w-2/5 hidden lg:block md:mb-10' src={logo_corlad} alt="Logotipo corlad" />
          <div className="flex flex-col justify-center md:ms-8">
            <h3 className="text-3xl md:text-5xl text-center md:text-start font-extrabold">
              <span className="text-[#a67102] font-nunito">INFORMACIÓN</span>
              <br />
              <span className="text-[#00330A] font-nunito">INSTITUCIONAL</span>
            </h3>
            <p className="text-md md:text-xl text-center md:text-start my-5 font-didact">
              En el CORLAD CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
              Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
            </p>
            <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between mt-5">
              <div className="flex flex-col font-nunito">
                <p className="text-4xl xl:text-5xl font-extrabold text-center">2000+</p>
                <p className="text-[#a67102] text-lg xl:text-xl font-semibold text-center">Colegiados</p>
              </div>
              <div className="flex flex-col font-nunito">
                <p className="text-4xl xl:text-5xl font-extrabold text-center">2+</p>
                <p className="text-[#a67102] text-lg xl:text-xl font-semibold text-center">Convenios</p>
              </div>
              <div className="flex flex-col font-nunito">
                <p className="text-4xl xl:text-5xl font-extrabold text-center">40</p>
                <p className="text-[#a67102] text-lg xl:text-xl font-semibold text-center">Años sirviendo</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      
        {/*Nuestros servicios*/}
        <div className="flex flex-col my-12 mx-auto w-4/5 lg:w-4/5">
          <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-32 font-nunito">NUESTROS SERVICIOS</h3>
          <Servicios />
        </div>

        <div className="container mx-auto md:px-10">
        {/*Nuestros aliados*/}
        <div className="flex flex-col items-center mx-auto">
          <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-24 font-nunito">NUESTROS CONVENIOS</h3>
          <Carrousel />
        </div>

        {/*Noticias*/}
        <div className="flex flex-col items-center my-24 mx-auto">
          <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-24 font-nunito">NOTICIAS</h3>
          <div className="flex flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-14 mb-12">
            {data.map((noticia, index) => (
              <Card key={index} imageSource={noticia.imagen_publicacion} imageAlt="" cardTitle={noticia.titulo} cardText={limitarContenido(noticia.contenido, 30)} cardUrl="" />
            ))}
          </div>
          <Link to={'/noticias'} className="font-extrabold bg-[#a67102] text-white px-8 py-1 rounded-lg font-nunito">Ver Más</Link>
        </div>

      </div>

      <div className="w-full">
        <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-12 font-nunito">CONTÁCTANOS</h3>
        <div className="mx-auto py-24 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
          <Contacto />
        </div>
      </div>
      <Footer />

      <PopUps />

    </div >
  )
}
