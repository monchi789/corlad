import { useState } from "react";
import { Header } from "../../shared/Header";
import colegiadoDefault from "../../../assets/web/person_perfil.webp";
import { Dropdown } from 'primereact/dropdown';
import { getConsultarHabilidad } from "../../../api/colegiado.api";
import { HistorialDetalleColegiado } from "../../../interfaces/model/HistorialColegiado";
import { Footer } from "../../shared/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { classNames } from "primereact/utils";

export default function ConsultarHabilidad() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputPaterno, setInputPaterno] = useState("");
  const [inputMaterno, setInputMaterno] = useState("");
  const [colegiadoData, setColegiadoData] = useState<HistorialDetalleColegiado[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10); // Número de colegiados por página

  const options = [
    { label: 'Documento de identidad', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
    { label: 'Apellidos', value: 'apellidos' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    handleSearch(event.page, event.rows);
    window.scrollTo(0, 0);
  };

  // Template para el paginador
  const template = {
    layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    PageLinks: (options: any) => {

      const isActive = options.page === options.currentPage;

      return (
        <button
          className={classNames('px-3 py-1 mx-1 rounded-lg transition duration-300', {
            'bg-[#007336] text-white': isActive,
            'bg-white text-black': !isActive
          })}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      )
    }
  };

  const handleSearch = async (page = 0, pageSize = rows) => {
    let params = "";

    if (selectedOption) {
      switch (selectedOption) {
        case 'dni':
          params = `?dni_colegiado=${inputValue}`;
          break;
        case 'colegiatura':
          params = `?numero_colegiatura=${inputValue}`;
          break;
        case 'apellidos':
          params = `?apellido_paterno=${inputPaterno}&apellido_materno=${inputMaterno}`;
          break;
        default:
          break;
      }
    }

    try {
      if (selectedOption && (inputValue || (selectedOption === 'apellidos' && inputPaterno || inputMaterno))) {
        setIsLoading(true);
        setIsNotFound(false);

        const res = await getConsultarHabilidad(page, pageSize, params);
        if (res.data.results && res.data.results.length > 0) {
          setColegiadoData(res.data.results); // Cambiar a múltiples resultados
          setTotalRecords(res.data.count);
        } else {
          setColegiadoData([]);
          setIsNotFound(true);
        }
      } else {
        setColegiadoData([]);
        setIsNotFound(true);
      }
    } catch (error) {
      setColegiadoData([]);
      setIsNotFound(true);
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
            onChange={(e) => {
              setSelectedOption(e.value);
              setInputValue("");  // Limpiar input cuando cambia la opción
              setInputPaterno(""); // Limpiar input paterno
              setInputMaterno(""); // Limpiar input materno
            }}
            options={options}
            optionLabel="label"
            placeholder="Buscar por..."
            itemTemplate={itemCategoria}
          />
          {selectedOption === 'apellidos' ? (
            <>
              <input
                type="text"
                className="w-full md:w-1/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r"
                placeholder="Apellido Paterno"
                value={inputPaterno}
                onChange={(e) => setInputPaterno(e.target.value)}
              />
              <input
                type="text"
                className="w-full md:w-1/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r"
                placeholder="Apellido Materno"
                value={inputMaterno}
                onChange={(e) => setInputMaterno(e.target.value)}
              />
            </>
          ) : (
            <input
              type="text"
              className="w-full md:w-2/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingrese un valor"
            />
          )}
          <button
            className="w-full md:w-1/5 bg-[#00330a] hover:bg-green-800 transition duration-300 text-[#f0f0f0] md:ms-3 px-5 py-3 rounded"
            onClick={() => handleSearch(0, rows)}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="mx-auto md:px-10">
        {isLoading ? (
          <div className="flex justify-center items-center lg:my-24">
            <ClipLoader
              color={"#09853C"}
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : colegiadoData.length == 1 ? (
          <div className="flex flex-col lg:flex-row mx-auto lg:py-5 lg:my-12 w-2/5 rounded-lg ">
            <img
              className="w-1/2 lg:w-[500px] lg:h-[300px] mx-auto my-10 lg:my-0 lg:mx-24 rounded object-contain"
              src={colegiadoData[0].id_colegiado.foto_colegiado ? import.meta.env.VITE_API_URL_ALTER + colegiadoData[0].id_colegiado.foto_colegiado : colegiadoDefault}
              alt="Foto del colegiado"
            />
            <div className="w-full flex flex-col justify-center space-x-5 items-start">
              <div className="w-full flex flex-col justify-between md:flex-col space-y-5 items-start">
                <div className="space-y-1">
                  <p className="text-[#a67102] font-semibold">Nombres</p>
                  <p>{colegiadoData[0].id_colegiado.nombre}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#a67102] font-semibold">Apellidos</p>
                  <p>{colegiadoData[0].id_colegiado.apellido_paterno + ' ' + colegiadoData[0].id_colegiado.apellido_materno}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#a67102] font-semibold">N° de colegiatura</p>
                  <p>{colegiadoData[0].id_colegiado.numero_colegiatura}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#a67102] font-semibold">Estado:</p>
                  <p className={colegiadoData[0].id_colegiado.estado ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {colegiadoData[0].id_colegiado.estado ? "Habilitado" : "No Habilitado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : colegiadoData.length > 1 ? (
          <div className="mb-12">
            <div className="overflow-x-auto lg:w-3/5 mx-5 lg:mx-auto mb-5">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-[#00330a] text-white">
                  <tr className="font-nunito">
                    <th className="px-6 py-3 text-left text-md uppercase tracking-wider">REGUC</th>
                    <th className="px-6 py-3 text-left text-md uppercase tracking-wider">Nombres</th>
                    <th className="px-6 py-3 text-left text-md uppercase tracking-wider">Apellidos</th>
                    <th className="px-6 py-3 text-left text-md uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {colegiadoData.map(colegiado => (
                    <tr key={colegiado.id_colegiado.id} className="hover:bg-[#C9EDC6] transition duration-300">
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{colegiado.id_colegiado.numero_colegiatura}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{colegiado.id_colegiado.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{colegiado.id_colegiado.apellido_paterno + ' ' + colegiado.id_colegiado.apellido_materno}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md">
                        {colegiado.id_estado_colegiatura.estado_colegiatura ? (
                          <span className="text-[#00330a] font-semibold">Habilitado</span>
                        ) : (
                          <span className="text-red-600 font-semibold">No Habilitado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
              className="space-x-5 mt-5"
              template={template}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row mx-auto mb-12 lg:py-12 lg:my-24 w-4/5 rounded-lg justify-center items-center">
            {isNotFound && (
              <div className="text-center text-xl text-red-500 font-semibold">
                No se encontraron resultados.
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
