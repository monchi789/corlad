import { Header } from "../../components/shared/Header";
import { Footer } from "../../components/shared/Footer";
import { 
  FileText, 
  CreditCard, 
  Info, 
  ExternalLink,
  AlertTriangle,
  Camera,
  Building,
  Clock
} from "lucide-react";

export default function Colegiarse() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 pb-16 font-nunito mt-40">
        <div className="text-center mb-12">
          <h1 className="inline-flex flex-col lg:flex-row items-center justify-center text-4xl font-extrabold">
            <span className="text-[#a67102]">PASOS PARA</span>
            <span className="lg:ml-2 text-gray-800">COLEGIARSE</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Bienvenido al proceso de colegiación. Sigue estos pasos cuidadosamente para completar tu registro profesional.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-6 w-6 text-[#a67102]" />
              <h2 className="text-2xl font-bold text-gray-800">Requisitos para colegiarse</h2>
            </div>

            <div className="grid gap-4">
              {[
                { text: "DNI escaneado en PDF (Ambas caras)", important: true },
                { text: "Diploma de Bachillerato en PDF (Ambas caras)", important: true },
                { text: "Título Profesional en PDF (Ambas caras)", important: true },
                { text: "Registro Nacional de grados académicos y títulos profesionales (SUNEDU)" },
                { text: "Fotografía tamaño pasaporte en PNG/JPG < 500kb (Con terno oscuro y fondo blanco)", icon: <Camera className="h-4 w-4" /> },
                { text: "Fotografía en físico tamaño pasaporte (Entregar en CORLAD-CUSCO)", icon: <Building className="h-4 w-4" /> },
                { text: "Voucher de pago en CMAC Cusco (S/. 1000.00 soles)", icon: <CreditCard className="h-4 w-4" /> }
              ].map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a67102] text-white text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      {req.text}
                      {req.important && <span className="text-[#a67102] ml-1">*</span>}
                    </p>
                  </div>
                  {req.icon && <div className="text-gray-500">{req.icon}</div>}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-800">IMPORTANTE:</p>
                <p className="text-amber-700">
                  Enviar los requisitos 1, 2 y 3 en un solo archivo escaneado, legible y en formato horizontal. 
                  Nombre del archivo: <span className="font-semibold">NombreCompleto.pdf</span> (Máx. 4 MB).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="h-6 w-6 text-[#a67102]" />
              <h2 className="text-2xl font-bold text-gray-800">Información de pago</h2>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Colegio Regional de Licenciados en Administración Cusco</p>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <span className="font-semibold min-w-[100px]">Banco:</span>
                  <span>CONTINENTAL BBVA</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold min-w-[100px]">Cuenta:</span>
                  <span>0011 0224 0100 013353</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold min-w-[100px]">CCI:</span>
                  <span>0011 0224 0100 0133 5336</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <Info className="h-6 w-6 text-[#a67102]" />
              <h2 className="text-2xl font-bold text-gray-800">Información adicional</h2>
            </div>

            <div className="grid gap-3">
              {[
                { icon: <AlertTriangle />, text: "Verificar registro de grados/títulos en SUNEDU antes del pago" },
                { icon: <Building />, text: "Entregar foto física en Av. Garcilaso Nº 806 (costado Hotel Puma)" },
                { icon: <CreditCard />, text: "Incluir nombre completo, celular y firma en el voucher" },
                { icon: <Clock />, text: "Tiempo estimado: 1.5 a 2 meses" },
                { icon: <FileText />, text: "Documentos sin marcas de agua, sombras ni reflejos" }
              ].map((info, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-[#a67102]">{info.icon}</span>
                  <p className="text-gray-800">{info.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#a67102]/10 rounded-lg text-center">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                ¿Listo para colegiarte?
              </h4>
              <a
                href="https://forms.gle/Tz3fFPW34QYrcToF8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#a67102] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#8c5f02] transition duration-300"
              >
                Llenar solicitud
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
