import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { getAllNoticiasByPage } from "../../../../api/publicacion.api";
import { Publicacion } from "../../../../interfaces/model/Publicacion";
import logo_corlad_blanco from '../../../../assets/web/corlad_logo_blanco.png'
import logo_corlad from '../../../../assets/web/corlad_logo.png'
import background from "../../../../assets/web/machupicchu.webp"
import 'react-image-gallery/styles/css/image-gallery.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = lazy(() => import("../../components/shared/Header.tsx"));
const Card = lazy(() => import("../../components/Cards.tsx"));
const Carrousel = lazy(() => import("../../components/Carousel.tsx"));
const Footer = lazy(() => import("../../components/shared/Footer.tsx"));
const Contacto = lazy(() => import("../../components/shared/Contacto.tsx"));
const Servicios = lazy(() => import("./components/Servicios.tsx"));
const PopUps = lazy(() => import("./components/PopUps.tsx"));
const Gallery = lazy(() => import("../../components/Gallery.tsx"));

export default function Inicio() {

  const [data, setData] = useState<Publicacion[]>([]);

  useEffect(() => {
    async function cargarNoticias() {
      const res = await getAllNoticiasByPage(0, 3);
      setData(res.data.results);
    }
    cargarNoticias();
  }, []);

  return (
    <div className="bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <div className='relative mt-24 xl:mt-32'>
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
          <div className="flex md:flex-col lg:flex-row items-center my-24 mx-auto w-4/5">
            <img className='md:w-2/5 hidden lg:block md:mb-10' src={logo_corlad} alt="Logotipo corlad" />
            <div className="flex flex-col justify-center md:ms-8">
              <h2 className="text-3xl md:text-5xl text-center md:text-start font-extrabold">
                <span className="text-[#a67102] font-nunito">INFORMACIÓN</span>
                <br />
                <span className="text-[#00330A] font-nunito">INSTITUCIONAL</span>
              </h2>
              <p className="text-md text-[#363636] md:text-xl text-center md:text-start my-5 font-didact">
                En el CORLAD CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
                Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
              </p>
              <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between mt-5">
                <div className="flex flex-col font-nunito">
                  <p className="text-4xl text-[#00330A] xl:text-5xl font-extrabold text-center">2000+</p>
                  <p className="text-[#00330A] text-lg xl:text-xl font-bold text-center">Colegiados</p>
                </div>
                <div className="flex flex-col font-nunito">
                  <p className="text-4xl text-[#00330A] xl:text-5xl font-extrabold text-center">2+</p>
                  <p className="text-[#00330A] text-lg xl:text-xl font-bold text-center">Convenios</p>
                </div>
                <div className="flex flex-col font-nunito">
                  <p className="text-4xl text-[#00330A] xl:text-5xl font-extrabold text-center">40</p>
                  <p className="text-[#00330A] text-lg xl:text-xl font-bold text-center">Años sirviendo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="container mx-auto md:px-10">
        <div className="flex flex-col items-center mb-12 mx-auto px-5">
          <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-24 font-nunito">SERVICIOS</h3>
          <Servicios />
        </div>
        
          <div className="flex flex-col items-center mb-24 mx-auto">
            <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-12 font-nunito">PUBLICACIONES</h3>
            <div className="flex flex-col xl:flex-row space-y-10 xl:space-y-0 xl:space-x-10 mb-12">
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
            <Link to={'/noticias'} className="font-semibold font-nunito bg-corlad hover:bg-hover-corlad transition duration-300 text-white rounded-lg px-5 py-2">Ver más publicaciones</Link>
          </div>

          <div className="flex flex-col items-center mx-auto mb-24">
            <h3 className="font-extrabold text-center text-3xl md:text-4xl text-[#a67102] mb-12 font-nunito">NUESTROS CONVENIOS</h3>
            <Carrousel />
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
      </Suspense>
    </div>
  );
}
