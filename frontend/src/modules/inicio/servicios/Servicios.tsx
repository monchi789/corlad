import servicio01 from '../../../assets/corlad_logo.png'
import servicio02 from '../../../assets/corlad_logo.png'
import servicio03 from '../../../assets/corlad_logo.png'
import servicio04 from '../../../assets/corlad_logo.png'

export function Servicios() {
  return (
    <div className="flex flex-wrap xl:flex-nowrap md:flex-col xl:flex-row space-y-24 lg:space-y-24 xl:space-y-0 xl:space-x-6 justify-between text-center mb-24">
      <div className="flex flex-col w-full xl:w-1/4 py-8 lg:px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="bg-[#04853D] w-24 h-24 p-5 rounded-full" src={servicio01} alt="Logo CORLAD" />
        </div>
        <h3 className="font-extrabold text-center text-xl mb-5 font-nunito">
          CONSULTAR <br /> COLEGIATURA
        </h3>
        <p className="font-didact mt-auto px-5 mb-5">Consulta tu información y tu estado de colegiatura.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto font-mukta">
          Más información →
        </button>
      </div>

      <div className="flex flex-col w-full xl:w-1/4 py-8 lg:px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="bg-[#04853D] w-24 h-24 p-5 rounded-full" src={servicio02} alt="Logo CORLAD" />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">CONVENIOS</h3>
        <p className="font-didact mt-auto px-5 mb-5">Convenios entre intituciones regionales e nacionales.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto font-mukta">
          Más información →
        </button>
      </div>
      
      <div className="flex flex-col w-full xl:w-1/4 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="bg-[#04853D] w-24 h-24 p-5 rounded-full" src={servicio03} alt="Logo CORLAD" />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">COLEGIATURA</h3>
        <p className="font-didact mt-auto px-5 mb-5">Información y requisitos necesarios para obtener  el registro único de colegiación.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto font-mukta">
          Más información →
        </button>
      </div>

      <div className="flex flex-col w-full xl:w-1/4 py-8 px-8 bg-[#F0F0F0] relative pt-16 rounded-3xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img className="bg-[#04853D] w-24 h-24 p-5 rounded-full" src={servicio04} alt="Logo CORLAD" />
        </div>
        <h3 className="font-extrabold text-xl my-5 font-nunito">NOTICIAS</h3>
        <p className="font-didact mt-auto px-5 mb-5">Mantente informado sobre nuestra institución y del sector profesional.</p>
        <button className="mt-auto bg-[#a67102] text-white py-2 px-4 rounded-full block mx-auto font-mukta">
          Más información →
        </button>
      </div>
    </div>

  )
}
