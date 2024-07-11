import { Header } from "../../shared/components/Header";
import colegiado from "../../assets/person_perfil.webp"
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react";
import { getColegiadoByFilters } from "../../shared/api/colegiado.api";
import { defaultHistorialDetalleColegiado, HistorialDetalleColegiado } from "../../interfaces/HistorialColegiado";

export function ConsultarColegiado() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [colegiadoData, setColegiadoData] = useState<HistorialDetalleColegiado>(defaultHistorialDetalleColegiado);

  const options = [
    { label: 'Apellidos y nombres', value: 'apellidos-nombres' },
    { label: 'Dni', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="px-3 py-2 hover:bg-[#E6F3E6] text-[#00330a] flex items-center justify-between">
        <span>{option.label}</span>
      </div>
    );
  };

  const handleSearch = async () => {
    let params: string = "";

    if (selectedOption) {
      switch (selectedOption) {
        case 'apellidos-nombres':
          params = `?apellido_paterno=${inputValue}`;
          break;
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
      const response = await getColegiadoByFilters(params);
      if (response.data && response.data.length > 0) {
        const element = response.data[0];
        
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
        console.log(colegiadoFilter);
        setColegiadoData(colegiadoFilter);

      } else {
        console.error('No data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <div className="flex flex-col w-5/6 md:w-4/6 space-y-3 md:space-y-0 md:flex-row pt-12 lg:pt-24">
          <Dropdown
            className="w-full md:w-1/5 md:w-14rem p-3 bg-[#00330a] text-[#f0f0f0] rounded-s rounded-none items-center border-cyan-50"
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
            className="w-full md:w-3/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-full md:w-1/5 bg-[#00330a] text-[#f0f0f0] md:ms-3 px-5 py-3 rounded"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="mx-auto md:px-10">
        <div className="flex flex-col lg:flex-row mx-auto mb-12 lg:py-16 lg:my-24 w-4/5 rounded-lg shadow-xl">
          <img
            className="w-1/2 lg:w-1/4 mx-auto my-10 lg:my-0 lg:mx-24 rounded"
            src={colegiado}
            alt="Foto del colegiado"
          />
          <div className="w-full flex flex-col md:flex-row justify-center space-x-5 items-start me-24">
            <div className="w-full flex flex-col space-y-5 lg:space-y-10 px-5 pb-5 lg:pb-0">
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Nombres</p>
                <p>{colegiadoData.id_colegiado.nombre || <br />}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Apellidos</p>
                <p>{colegiadoData.id_colegiado.apellido_paterno+colegiadoData.id_colegiado.apellido_materno || <br />}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">N° de colegiatura</p>
                <p>{colegiadoData.id_colegiado.numero_colegiatura || <br />}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Estado</p>
                <p className={colegiadoData.id_colegiado.estado ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {colegiadoData.id_colegiado.estado ? "Habilitado" : "No Habilitado"}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-5 lg:space-y-10 px-5 pb-5 lg:pb-0">
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Correo electrónico</p>
                <p>{colegiadoData.id_colegiado.correo || <br />}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Capítulo</p>
                <p>{colegiadoData.id_especialidad.id_escuela.nombre_escuela || <br />}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#a67102] font-semibold">Sub especialidad</p>
                <p>{colegiadoData.id_especialidad.nombre_especialidad || <br />}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
