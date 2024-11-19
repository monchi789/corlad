import { Header } from "../../components/shared/Header";
import { Footer } from "../../components/shared/Footer";

export default function Colegiarse() {

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 pb-12 font-nunito mt-48 items-center">
      <h1 className="flex flex-col justify-center lg:flex-row font-extrabold text-4xl font-nunito text-[#a67102] mb-12 text-center">PASOS PARA&nbsp;<span className="text-[#363636]">COLEGIARSE</span></h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-[#363636] mb-6">Requisitos para colegiarse</h3>

            <ol className="list-decimal list-inside space-y-4 text-[#363636]">
              <li>Documento Nacional de Identidad (DNI) escaneado en formato PDF <span className="font-bold">(Ambas caras).</span></li>
              <li>Diploma de Bachillerato en formato PDF <span className="font-bold">(Ambas caras).</span></li>
              <li>Título Profesional en formato PDF <span className="font-bold">(Ambas caras).</span></li>
              <li>Registro Nacional de grados académicos y títulos profesionales (SUNEDU) en formato PDF</li>
              <li>Fotografía tamaño pasaporte en formato JPG <span className="font-bold">(Con terno oscuro).</span></li>
              <li>Fotografía en físico tamaño pasaporte <span className="font-bold">(Traer al CORLAD-Cusco).</span></li>
              <li>Voucher de pago en un solo depósito, escaneado en formato PDF por derechos de inscripción en la CMAC Cusco <span className="font-bold">(S/. 1000.00 soles).</span></li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="font-bold">NOTA:</p>
              <p>Enviar los requisitos: 1, 2, y 3 en un solo archivo, escaneado legible y de forma correcta (horizontal) consignando nombre completo (peso máximo de archivo: 4 MB).</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-xl font-bold text-[#363636] mb-4">Información de pago</h3>
            <p className="mb-2"><span className="font-bold">Nº DE CUENTA:</span> 106042321009414461</p>
            <p className="mb-2"><span className="font-bold">CAJA MUNICIPAL DE AHORRO Y CRÉDITO CUSCO</span></p>
            <p className="mb-2">Lic. Adm. Willy Bravo Aparicio</p>
            <p>Lic. Adm. Edgar Quispe Reyes</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-xl font-bold text-[#363636] mb-4">Información adicional</h3>
            <ul className="list-disc list-inside space-y-2 text-[#363636]">
              <li>Antes de realizar el pago verificar que sus grados o títulos estén registrados en SUNEDU.</li>
              <li>Item 6 traer a la oficina.</li>
              <li>Estamos ubicados en la Av. Garcilaso Nº 806, Ref. costado Hotel Puma.</li>
              <li>Consignar en el voucher de pago: nombre completo, número de celular y firma.</li>
              <li>El trámite dura aprox. entre un mes y medio a 2 meses.</li>
              <li>Enviar los documentos de acuerdo a las indicaciones. El escaneado de los documentos no deben tener marcas de agua de aplicativos, sombras ni brillo que no permitan ver los datos del documento.</li>
            </ul>

            <div className="mt-8">
              <h4 className="text-lg font-bold text-[#363636] mb-2">Formulario de solicitud de colegiación</h4>
              <a href="https://forms.gle/j9iA8UWdAGvrZDqx6" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#a67102] text-white font-bold py-2 px-4 rounded hover:bg-[#8c5f02] transition duration-300">
                Llenar solicitud
              </a>
            </div>
          </div>
        </div>
      </div>  
      <Footer />
    </div>
  )
}
