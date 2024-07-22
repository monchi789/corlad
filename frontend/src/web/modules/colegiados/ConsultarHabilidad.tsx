import { useState } from "react";
import { Header } from "../../shared/Header";
import colegiado from "../../../assets/web/person_perfil.webp"
import { Dropdown } from 'primereact/dropdown';
import { getColegiadoByFilters } from "../../../api/colegiado.api";
import { defaultHistorialDetalleColegiado, HistorialDetalleColegiado } from "../../../interfaces/model/HistorialColegiado";
import { Footer } from "../../shared/Footer";
import ClipLoader from "react-spinners/ClipLoader";

export function ConsultarHabilidad() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [colegiadoData, setColegiadoData] = useState<HistorialDetalleColegiado>(defaultHistorialDetalleColegiado);
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { label: 'Dni', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  const handleSearch = async () => {
    let params = "";
  
    if (selectedOption) {
      switch (selectedOption) {
        case 'dni':
          params = `?dni_colegiado=${inputValue}`;
          break;
        case 'colegiatura':
          params = `?numero_colegiatura=${inputValue}`;
          break;
        default:
          break;
      }
    }
  
    try {
      if (selectedOption && inputValue) {
        setIsLoading(true); // Inicia la carga
        const startTime = Date.now();
  
        const response = await getColegiadoByFilters(params);
        if (response.data.results && response.data.results.length > 0) {
          const element = response.data.results[0];
  
          const colegiadoFilter: HistorialDetalleColegiado = {
            id_colegiado: {
              id: element.id_colegiado.id,
              nombre: element.id_colegiado.nombre,
              apellido_paterno: element.id_colegiado.apellido_paterno,
              apellido_materno: element.id_colegiado.apellido_materno,
              correo: element.id_colegiado.correo,
              estado: element.id_colegiado.estado,
              foto_colegiado: element.id_colegiado.foto_colegiado,
              numero_colegiatura: element.id_colegiado.numero_colegiatura
            },
            id_especialidad: {
              id: element.id_especialidad.id,
              id_escuela: element.id_especialidad.id_escuela,
              nombre_especialidad: element.id_especialidad.nombre_especialidad
            }
          };
          setColegiadoData(colegiadoFilter);
        } else {
          setColegiadoData(defaultHistorialDetalleColegiado); // No se encontraron datos
        }
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 1000) {
          await new Promise(resolve => setTimeout(resolve, 1000 - elapsedTime));
        }
      } else {
        console.error('No se encontraron datos');
        setColegiadoData(defaultHistorialDetalleColegiado); // Restablecer datos
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setColegiadoData(defaultHistorialDetalleColegiado); // Restablecer datos en caso de error
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto my-12 items-center mt-48">
        <h1 className="flex flex-col md:flex-row font-extrabold text-4xl font-nunito text-center text-[#A67102]">
          CONSULTAR&nbsp;
          <p className="text-[#363636]">HABILIDAD</p>
        </h1>
        <div className="flex flex-col w-5/6 md:w-full lg:w-5/6 xl:w-4/6 space-y-3 md:space-y-0 md:flex-row pt-12 lg:pt-24 justify-center">
          <Dropdown
            className="w-full md:w-1/5 md:w-14rem bg-[#00330a] hover:bg-green-800 transition duration-300 text-[#f0f0f0] rounded-s rounded-none items-center border-cyan-50 p-3"
            panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.value)}
            options={options}
            optionLabel="label"
            placeholder="Buscar por..."
            itemTemplate={itemCategoria}
          />
          <input
            type="text"
            className="w-full md:w-2/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-full md:w-1/5 bg-[#00330a] hover:bg-green-800 transition duration-300 text-[#f0f0f0] md:ms-3 px-5 py-3 rounded"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="mx-auto md:px-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 lg:my-24">
            <ClipLoader
              color={"#09853C"}
              loading={isLoading}
              size={250}
              aria-label="Loading Spinner"
              data-testid="loader"
              className=""
            />
          </div>
        ) : colegiadoData.id_colegiado.id ? (
          <div className="flex flex-col lg:flex-row mx-auto mb-12 lg:py-16 lg:my-24 w-4/5 rounded-lg shadow-xl">
            <img
              className="w-1/2 min-w-max lg:w-[500px] lg:h-[350px] mx-auto my-10 lg:my-0 lg:mx-24 rounded object-cover"
              src={import.meta.env.VITE_API_URL_ALTER + colegiadoData.id_colegiado.foto_colegiado || colegiado}
              alt="Foto del colegiado"
            />
            <div className="w-full flex flex-col justify-center space-x-5 items-start me-24">
              <div className="w-full flex flex-col md:flex-row justify-center space-x-5 items-start me-24">
                <div className="w-full flex flex-col space-y-5 lg:space-y-10 px-5 pb-5 lg:pb-0">
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">Nombres</p>
                    <p>{colegiadoData.id_colegiado.nombre}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">Apellidos</p>
                    <p>{colegiadoData.id_colegiado.apellido_paterno + ' ' + colegiadoData.id_colegiado.apellido_materno}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">N° de colegiatura</p>
                    <p>{colegiadoData.id_colegiado.numero_colegiatura}</p>
                  </div>

                </div>
                <div className="w-full flex flex-col space-y-5 lg:space-y-10 pb-5 lg:pb-0">
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">Correo electrónico</p>
                    <p>{colegiadoData.id_colegiado.correo}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">Capítulo</p>
                    <p>{colegiadoData.id_especialidad.id_escuela.nombre_escuela}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#a67102] font-semibold">Sub especialidad</p>
                    <p>{colegiadoData.id_especialidad.nombre_especialidad}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-3 items-center w-full my-10 lg:mt-10">
                <p className="text-[#a67102] font-semibold">Estado:</p>
                <p className={colegiadoData.id_colegiado.estado ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {colegiadoData.id_colegiado.estado ? "Habilitado" : "No Habilitado"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row mx-auto mb-12 lg:py-16 lg:mb-24 w-4/5 rounded-lg">
            <img
              className="w-5/6 md:w-4/6 xl:w-1/4 mx-auto my-10 lg:my-0 rounded object-cover"
              src={colegiado}
              alt="Foto del colegiado"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

