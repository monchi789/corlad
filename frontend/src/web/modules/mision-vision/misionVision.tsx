import { Header } from "../../shared/Header";
import { Footer } from "../../shared/Footer";

interface PDFViewerProps {
  pdfName: string;
}

function PDFViewer({ pdfName }: PDFViewerProps) {
  return (
    <div className="w-full h-[800px] overflow-hidden">
      <iframe
        src={`/docs/${pdfName}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="PDF Viewer"
      />
    </div>
  );
}

export default function VisionMision() {
  return (
    <div>
      <Header />
      <div className="container  mx-auto px-4 py-12 font-nunito mt-48 items-center">
        <h1 className="flex flex-col justify-center lg:flex-row font-extrabold text-4xl font-nunito text-[#a67102] mb-12 text-center">MISION &nbsp;<span className="text-[#363636]">Y VISION</span></h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-[#363636] mb-4">Nuestra Misión</h2>
            <p className="text-lg text-[#363636]">
              El Colegio Regional de Licenciados en Administración de Cusco (CORLAD-Cusco) tiene como misión promover el desarrollo profesional y ético de sus miembros, fomentando la excelencia en la práctica de la administración y contribuyendo al progreso socioeconómico de la región Cusco y del Perú.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-[#363636] mb-4">Nuestra Visión</h2>
            <p className="text-lg text-[#363636]">
              Ser reconocidos como la institución líder en la región Cusco en la formación y representación de profesionales en administración, caracterizados por su alto nivel de competencia, ética y compromiso con el desarrollo sostenible de nuestra sociedad.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-[#363636] mb-8 text-center">Documentos Institucionales</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-[#363636] mb-4">Código de Ética Profesional 2023</h3>
            <PDFViewer pdfName="CODIGO DE ETICA PROFESIONAL 2023 [F].pdf" />
            <a
              href={`/docs/CODIGO DE ETICA PROFESIONAL 2023 [F].pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#a67102] text-white font-bold py-2 px-4 rounded hover:bg-[#8c5f02] transition duration-300"
            >
              Descargar PDF
            </a>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-[#363636] mb-4">Estatuto Clad</h3>
            <PDFViewer pdfName="01. Estatuto-Clad (3).pdf" />
            <a
              href={`/docs/01. Estatuto-Clad (3).pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#a67102] text-white font-bold py-2 px-4 rounded hover:bg-[#8c5f02] transition duration-300"
            >
              Descargar PDF
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
