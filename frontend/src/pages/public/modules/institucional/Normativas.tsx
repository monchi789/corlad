import { Footer } from "../../components/shared/Footer";
import { Header } from "../../components/shared/Header";

export default function Normativas() {

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

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-40 mb-24 items-center">
        <h1 className="flex flex-col justify-center lg:flex-row font-extrabold text-3xl md:text-4xl text-center font-nunito text-[#a67102] mb-12">
          DOCUMENTOS&nbsp;<span className="text-default">INSTITUCIONALES</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-8 mx-10">
          <div className="bg-white shadow-lg rounded-lg flex flex-col items-center p-8">
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

          <div className="bg-white shadow-lg rounded-lg flex flex-col items-center p-8">
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
      <Footer/>
    </div>
  )
}