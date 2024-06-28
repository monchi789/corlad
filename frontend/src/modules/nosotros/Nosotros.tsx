import { Header } from "../../shared/components/Header";
import corlad_logo from "../../assets/corlad_logo.png"
import { Footer } from "../../shared/components/Footer";

export function Nosotros() {
  return (
    <div>
      <Header />
      <div className="container flex flex-col mx-auto my-12 items-center">
        <h1 className="flex flex-row font-extrabold text-4xl font-nunito"><span className="text-[#a67102]">INFORMACIÓN</span>&nbsp;<span className="text-[#363636]">INSTITUCIONAL</span></h1>
        <div className="flex flex-row items-center w-4/5 my-24">
          <img className="w-1/3 mx-16" src={corlad_logo} alt="Logo corlad cusco" />
          <p className="mx-16 font-didact">
            En el CORLAD - CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
            Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
            En el CORLAD - CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
            Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
            En el CORLAD CUSCO estamos comprometidos con la noble misión de seguir educando a nuestros profesionales.
            Complementamos la educación de nuestros profesionales con temas relevantes para la profesión y la región.
          </p>
        </div>
      </div>
      <div className="flex flex-row mx-auto w-full my-12 font-nunito">
        <div className="w-1/3 text-center">
          <p className="text-5xl font-extrabold">1589+</p>
          <p className="font-semibold text-xl text-[#a67102]">Colegiados</p>
        </div>
        <div className="w-1/3 text-center">
          <p className="text-5xl font-extrabold">12+</p>
          <p className="font-semibold text-xl text-[#a67102]">Convenios institucionales</p>
        </div>
        <div className="w-1/3 text-center">
          <p className="text-5xl font-extrabold">10</p>
          <p className="font-semibold text-xl text-[#a67102]">Años sirviendo</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
