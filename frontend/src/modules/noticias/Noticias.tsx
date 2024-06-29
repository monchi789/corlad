import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import logo_corlad from "../../assets/corlad_logo.png"

export function Noticias() {
  return (
    <>
      <Header />
      <div className="flex flex-col mt-48">
        <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center ">NOTICIAS</h1>
        <div className="flex flex-row">
          <p>Categoria</p>
          <div className="bg-[#363636]">
            <div className="flex flex-row">
              <img className="w-1/2" src={logo_corlad} alt="" />
              <h3>Titulo</h3>
              <p>Descripcion</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
