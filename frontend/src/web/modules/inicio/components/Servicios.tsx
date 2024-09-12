import { MdOutlinePersonSearch, MdWork } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Servicios() {
  return (
    <div className="flex flex-wrap xl:flex-nowrap md:flex-col xl:flex-row space-y-24 lg:space-y-24 xl:space-y-0 xl:space-x-6 justify-between text-center mb-12">
      {/* Consultar Colegiatura */}
      <div className="flex flex-col w-full xl:w-1/3 py-8 lg:px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MdOutlinePersonSearch size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="text-[#363636] font-extrabold text-center text-xl mb-5 font-nunito">
          CONSULTAR <br /> COLEGIATURA
        </h3>
        <p className="text-[#363636] font-didact mb-auto">
          Consulta el estado de tu colegiatura y otros detalles importantes sobre tu membresía en nuestra institución. 
        </p>
        <Link to={"/consultar-habilidad"}>
          <button className="flex items-center justify-center bg-[#a67102] hover:bg-[#8C5D01] text-white rounded-lg mx-auto font-nunito transition duration-300 space-x-2 mt-5 py-2 px-4">
            <span>Más información</span>
            <FaArrowRightLong />
          </button>
        </Link>
      </div>

      {/* Publicaciones */}
      <div className="flex flex-col w-full xl:w-1/3 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HiOutlineNewspaper size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="text-[#363636] font-extrabold font-nunito text-xl my-5">PUBLICACIONES</h3>
        <p className="text-[#363636] font-didact mb-auto">
          Mantente al tanto de las últimas noticias, eventos, y novedades de nuestra institución. 
        </p>
        <Link to={"/noticias"}>
          <button className="flex items-center justify-center bg-[#a67102] hover:bg-[#8C5D01] text-white rounded-lg mx-auto font-nunito transition duration-300 space-x-2 mt-5 py-2 px-4">
            <span>Más información</span>
            <FaArrowRightLong />
          </button>
        </Link>
      </div>

      {/* Bolsa de Trabajo */}
      <div className="flex flex-col w-full xl:w-1/3 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MdWork size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="text-[#363636] font-extrabold text-xl my-5 font-nunito">BOLSA DE TRABAJO</h3>
        <p className="text-[#363636] font-didact mb-auto">
          Encuentra ofertas de trabajo en tu área de especialidad y accede a recursos para mejorar tus habilidades profesionales.
        </p>
        <Link to={"/colegiatura"}>
        <button className="flex items-center justify-center bg-[#a67102] hover:bg-[#8C5D01] text-white rounded-lg mx-auto font-nunito transition duration-300 space-x-2 mt-5 py-2 px-4">
        <span>Más información</span>
            <FaArrowRightLong />
          </button>
        </Link>
      </div>
    </div>


  )
}
