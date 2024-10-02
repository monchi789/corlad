import { Footer } from "../../shared/Footer";
import { Header } from "../../shared/Header";
import Contacto from "./contacto/Contacto";

export default function Contactanos() {
  return (
    <div>
      <Header />
      <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center mt-40 mb-12">CONTÁCTANOS</h1>
      <Contacto />
      <div className="text-center space-y-5 mt-24">
        <h2 className="text-4xl text-[#a67102] font-extrabold font-nunito">UBICACIÓN</h2>
        <p className="font-semibold font-nunito">Av. Garcilaso 806-3, Cusco 08002</p>
        <iframe className="w-full brightness-50 hover:brightness-100 transition-all duration-500" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d407.7517838737097!2d-71.97341140739324!3d-13.522664676866231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd532f288b537%3A0xb89724d8b0977299!2sColegio%20de%20Regional%20de%20Licenciados%20en%20Administracion!5e0!3m2!1ses-419!2spe!4v1719259685683!5m2!1ses-419!2spe" width="600" height="450"  loading="lazy"></iframe>
      </div>
      <Footer/>
    </div>
  )
}
