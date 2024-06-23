import { Header } from "../../shared/components/Header";
import logo_corlad from '../../assets/corlad_logo.png'
import entradas from '../../assets/entradas_conandino.png'
import map from '../../assets/map-pin.svg'
import phone from '../../assets/phone.svg'
import mail from '../../assets/mail.svg'
import Slider from "./slider/Slider";
import Card from "../shared/Card";
import { Link } from "react-router-dom";
import 'react-image-gallery/styles/css/image-gallery.css'
import Carrousel from "./carousel/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Noticia } from "../../interfaces/Noticia";
import { Footer } from "../../shared/components/Footer";

export function Inicio() {
    const noticias: Noticia[] = [
        {
            img: entradas,
            title: "Lanzamiento de entradas - Coandino",
            description: "Esta es la descripcion de la carta. Esta es la descripcion de la carta. Esta es la descripcion de la carta"
        },
        {
            img: entradas,
            title: "Lanzamiento de entradas - Coandino",
            description: "Esta es la descripcion de la carta. Esta es la descripcion de la carta. Esta es la descripcion de la carta"
        },
        {
            img: entradas,
            title: "Lanzamiento de entradas - Coandino",
            description: "Esta es la descripcion de la carta. Esta es la descripcion de la carta. Esta es la descripcion de la carta"
        }
    ]
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
                        {noticias.map((element) => (
                            <Card imageSource={element.img} imageAlt="" cardTitle={element.title} cardText={element.description} cardUrl="" />
                        ))}
                    </div>
                    <Link to={'/noticias'} className="font-extrabold bg-[#a67102] text-white px-8 py-1 rounded-lg">Ver Más</Link>
                </div>

                {/*Contáctanos*/}
                <div className="my-24 mx-auto">
                    <h3 className="font-extrabold text-center text-4xl text-[#a67102] mb-24">CONTÁCTANOS</h3>
                    <div className="bg-[#03853D] p-8 rounded-3xl flex max-w-5xl mx-auto relative">
                        <div className="bg-[#00330A] text-[#a67102] p-5 rounded-2xl w-2/5 absolute -left-24 top-4 bottom-4 shadow-lg z-10 my-10">
                            <div className="py-5 ms-8">
                                <h3 className="text-center text-2xl font-bold mb-6">Contacto</h3>
                                <div className="space-y-8">
                                    <div className="flex flex-row space-x-5 items-center">
                                        <img src={map} alt="icon_map" className="w-8 h-8" />
                                        <div className="space-y-1">
                                            <p className="font-semibold">Ubicación</p>
                                            <p className="text-white">Av. Garcilaso 806-3, Cusco 08002</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-5 items-center">
                                        <img src={mail} alt="icon_map" className="w-8 h-8" />
                                        <div className="space-y-1">
                                            <p className="font-semibold">Correo electrónico</p>
                                            <p className="text-white">example@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-5 items-center">
                                        <img src={phone} alt="icon_map" className="w-8 h-8" />
                                        <div className="space-y-1">
                                            <p className="font-semibold">Celulares</p>
                                            <p className="text-white">+999887232</p>
                                            <p className="text-white">+987674534</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/6 me-10"></div>

                        <div className="w-3/5 pl-8 my-5">
                            <form className="space-y-4 me-10">
                                <div>
                                    <label htmlFor="nombre" className="block text-white mb-1">Nombre</label>
                                    <input type="text" id="nombre" name="nombre" className="w-full p-2 rounded" />
                                </div>
                                <div>
                                    <label htmlFor="correo" className="block text-white mb-1">Correo electrónico</label>
                                    <input type="email" id="correo" name="correo" className="w-full p-2 rounded" />
                                </div>
                                <div>
                                    <label htmlFor="celular" className="block text-white mb-1">Número de celular</label>
                                    <input type="tel" id="celular" name="celular" className="w-full p-2 rounded" />
                                </div>
                                <div>
                                    <label htmlFor="mensaje" className="block text-white mb-1">Mensaje</label>
                                    <textarea id="mensaje" name="mensaje" rows={4} className="w-full p-2 rounded resize-none"></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="bg-[#00330A] text-white px-10 py-1 rounded hover:bg-green-800">
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}