import { Header } from "../../components/shared/Header";
import corlad_logo from "../../../../assets/web/corlad_logo.png"
import direccion_01 from "../../../../assets/web/directivos/decano_regional.jpg"
import direccion_02 from "../../../../assets/web/directivos/vice_decano_regional.jpg"
import direccion_03 from "../../../../assets/web/directivos/director_economia_finanzas.jpg"
import direccion_04 from "../../../../assets/web/directivos/director_desarrollo_habilitacion.jpg"
import direccion_05 from "../../../../assets/web/directivos/director_informacion_cientifica_tecnologica.jpg"
import direccion_06 from "../../../../assets/web/directivos/director_imagen_institucional.jpg"

import { Footer } from "../../components/shared/Footer";
import Carousel from "../../components/Carousel";

export default function Nosotros() {

  const directivos = [
    {
      imgDirectivo: direccion_01,
      nombreDirectivo: "Willy Bravo Aparicio",
      cargoDirectivo: "DECANO REGIONAL"
    },
    {
      imgDirectivo: direccion_02,
      nombreDirectivo: "Gabriel Suyo Cruz",
      cargoDirectivo: "VICEDECANO REGIONAL"
    },
    {
      imgDirectivo: direccion_03,
      nombreDirectivo: "Edgar Quispe Reyes",
      cargoDirectivo: "DIRECTOR DE ECONOMÍA Y FINANZAS"
    },
    {
      imgDirectivo: direccion_04,
      nombreDirectivo: "Ruth Josefina Salazar Herrera",
      cargoDirectivo: "DIRECTORA DE DESARROLLO Y HABILITACIÓN PROFESIONAL"
    },
    {
      imgDirectivo: direccion_05,
      nombreDirectivo: "Wilfredo Loayza Palma",
      cargoDirectivo: "DIRECTOR DE INFORMACIÓN CIENTÍFICA Y TECNOLÓGICA"
    },
    {
      imgDirectivo: direccion_06,
      nombreDirectivo: "Manuel Jesus Zvietcovich Alvarez",
      cargoDirectivo: "DIRECTOR DE IMAGEN INSTITUCIONAL"
    }
  ]

  const cardDirectivo = (imgDirectivo: string, nombreDirectivo: string, cargoDirectivo: string) => {
    return (
      <>
        <img className="lg:w-full mx-auto" src={imgDirectivo} alt="" />
        <span className="text-2xl text-[#00330A] font-nunito font-bold pt-3 pb-1">{nombreDirectivo}</span>
        <p className="font-nunito font-semibold">{cargoDirectivo}</p>
      </>
    )
  }

  return (
    <div>
      <Header />
      <div className="container flex flex-col mx-auto mt-32 lg:mt-40 items-center">
        <h1 className="flex flex-col lg:flex-row font-extrabold text-3xl md:text-4xl font-nunito text-[#a67102]">INFORMACIÓN&nbsp;<span className="text-[#363636]">INSTITUCIONAL</span></h1>
        <div className="flex flex-col lg:flex-row items-center w-4/5 my-6 lg:my-12">
          <img className="w-full md:w-2/3 lg:w-1/4 lg:ms-20" src={corlad_logo} alt="Logo corlad cusco" />
          <p className="text-xl text-[#363636] lg:my-0 lg:mx-12 xl:mx-24 font-didact my-6">
            El Colegio Regional de Licenciados en Administración Cusco con 40 años de ser fundado, creado en el año 1984, agrupa a las carreras de administración,
            negocios internacionales, marketing y finanzas dirigido por el decano Willy Bravo Aparicio en su gestión 2024 - 2025 con el lema <b>“integridad y servicio”</b> para sus agremiados.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mx-auto w-full font-nunito items-center space-y-10 lg:space-y-0 mt-5 mb-24">
        <div className="lg:w-1/3 text-center">
          <p className="text-4xl text-[#00330A] lg:text-5xl font-extrabold">2000+</p>
          <p className="font-bold text-lg lg:text-xl text-[#00330A]">Colegiados</p>
        </div>
        <div className="lg:w-1/3 text-center">
          <p className="text-4xl text-[#00330A] lg:text-5xl font-extrabold">2+</p>
          <p className="font-bold text-lg text-[#00330A]">Convenios institucionales</p>
        </div>
        <div className="lg:w-1/3 text-center">
          <p className="text-4xl text-[#00330A] lg:text-5xl font-extrabold">40</p>
          <p className="font-bold text-lg text-[#00330A]">Años sirviendo</p>
        </div>
      </div>

      <div className="relative flex flex-col bg-[#F8F8F8] items-center justify-center mx-auto my-24 py-12">
        <div className="relative z-10bg-opacity-80 p-10">
          <img src={corlad_logo} alt="Logo corlad cusco" className="absolute inset-0 lg:w-1/2 mx-auto my-auto object-cover z-0 opacity-20" />
          <h4 className="text-center text-3xl md:text-4xl font-nunito font-extrabold text-[#a67102] mb-12">HIMNO INSTITUCIONAL</h4>
          <p className="text-center text-[#363636] text-lg lg:text-xl  font-semibold">
            UN LEGADO CULTURAL Y DE CONDUCTA <br />
            PARA NUESTRA JUVENTUD <br />
            LA TECNOLOGÍA Y CIENCIA, LA EXPERIENCIA DETERMINAN LA VISIÓN <br />
            LICENCIADOS <br />
            EN ADMINISTRACIÓN <br />
            GRAN PASIÓN POR LA PROFESIÓN (BIS) <br />
            ESTRATEGIA <br />
            Y GESTIÓN DE SERVICIO <br />
            LICENCIADOS EN ADMINISTRACIÓN <br />
            PLANIFICACIÓN CONTROL TOTAL <br />
            NUESTRA META ES LA PRODUCTIVIDAD <br />
            TRABAJANDO <br />
            ENSANCHEMOS CAMINOS <br />
            EXTENDIÉNDONOS TODO EL PERÚ <br />
            DE NORTE A SUR <br />
            DE ESTE A OESTE <br />
            LICENCIADOS EN ADMINISTRACIÓN <br />
            LLEVANDO LA MISIÓN DE HONRAR NUESTRA NACIÓN <br />
            LICENCIADOS EN ADMINISTRACIÓN <br />
            EL 14 DE FEBRERO ES EL DÍA <br />
            DEL LICENCIADO EN ADMINISTRACIÓN <br />
            TRABAJANDO CON TESÓN <br />
            POR AMOR A LA NACIÓN <br />
            POR EL DON QUE NOS HA DADO DIOS <br />
            LICENCIADOS EN ADMINISTRACIÓN <br />
            GRAN PASIÓN POR LA PROFESIÓN (BIS) <br />
          </p>
        </div>
        <div className="container grid md:grid-cols-2 gap-10 mx-auto my-24">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-bold text-default-green mb-4">Nuestra Misión</h3>
            <p className="text-lg text-[#363636]">
              El Colegio Regional de Licenciados en Administración de Cusco (CORLAD-Cusco) tiene como misión promover el desarrollo profesional y ético de sus miembros, fomentando la excelencia en la práctica de la administración y contribuyendo al progreso socioeconómico de la región Cusco y del Perú.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-bold text-default-green mb-4">Nuestra Visión</h3>
            <p className="text-lg text-[#363636]">
              Ser reconocidos como la institución líder en la región Cusco en la formación y representación de profesionales en administración, caracterizados por su alto nivel de competencia, ética y compromiso con el desarrollo sostenible de nuestra sociedad.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="text-center font-nunito">
          <h3 className="font-extrabold text-center text-3xl lg:text-4xl md:text-4xl text-[#a67102] mb-5 ">CONSEJO DIRECTIVO</h3>
          <span className="text-xl font-semibold">Gestión 2024-2025</span>
          <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center mb-24 items-center">
            {directivos.map((directivo, index) => (
              <div className="flex flex-col lg:w-1/5 rounded text-center mx-10 mb-10 py-5 px-5" key={index}>
                {cardDirectivo(directivo.imgDirectivo, directivo.nombreDirectivo, directivo.cargoDirectivo)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mx-auto mb-24">
          <h3 className="font-extrabold text-center text-3xl lg:text-4xl md:text-4xl text-[#a67102] mb-24 font-nunito">NUESTROS CONVENIOS</h3>
          <Carousel />
        </div>

      </div>
      <Footer />
    </div>
  )
}
