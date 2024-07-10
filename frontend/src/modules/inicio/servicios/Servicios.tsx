import { MdOutlinePersonSearch } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { TbSchool } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Servicios() {
  return (
    <div className="flex flex-wrap xl:flex-nowrap md:flex-col xl:flex-row space-y-24 lg:space-y-24 xl:space-y-0 xl:space-x-6 justify-between text-center mb-24">
      <div className="flex flex-col w-full xl:w-1/3 py-8 lg:px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MdOutlinePersonSearch size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="font-extrabold text-center text-xl mb-5 font-nunito">
          CONSULTAR <br /> COLEGIATURA
        </h3>
        <p className="font-didact mt-auto mb-5">Consulta tu información y tu estado de colegiatura.</p>
        <Link to={"/consultar-habilidad"}>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-lg mx-auto font-mukta flex items-center justify-center space-x-2">
          <span>Más información</span>
          <FaArrowRightLong />
        </button>
        </Link>
      </div>

      <div className="flex flex-col w-full xl:w-1/3 py-8 lg:px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TbCertificate size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">CONVENIOS</h3>
        <p className="font-didact mt-auto mb-5">Convenios entre intituciones regionales e nacionales.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-lg mx-auto font-mukta flex items-center justify-center space-x-2">
          <span>Más información</span>
          <FaArrowRightLong />
        </button>
      </div>

      <div className="flex flex-col w-full xl:w-1/3 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TbSchool size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">COLEGIATURA</h3>
        <p className="font-didact mt-auto mb-5">Información y requisitos necesarios para obtener  el registro único de colegiación.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-lg mx-auto font-mukta flex items-center justify-center space-x-2">
          <span>Más información</span>
          <FaArrowRightLong />
        </button>
      </div>

      <div className="flex flex-col w-full xl:w-1/3 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HiOutlineNewspaper size={'100px'} className='bg-[#04853D] rounded-full text-white text-center p-5' />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">NOTICIAS</h3>
        <p className="font-didact mt-auto mb-5">Mantente informado sobre nuestra institución y del sector profesional.</p>
        <Link to={"/noticias"}>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-lg mx-auto font-mukta flex items-center justify-center space-x-2">
          <span>Más información</span>
          <FaArrowRightLong />
        </button>
        </Link>
      </div>
    </div>

  )
}
