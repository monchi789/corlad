import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Dropdown } from 'primereact/dropdown';
import { HistorialColegiado } from '../../../../interfaces/model/HistorialColegiado';
import { getHistorialColegiadoByFilters } from '../../../../api/historial.colegiado.api';

interface ParametrosBusqueda {
  dni_colegiado?: string,
  numero_colegiatura?: string,
  apellido_paterno?: string,
  estado_colegiado?: boolean | string | null
}

interface BuscarColegiadoProps {
  onSearchResults: (results: HistorialColegiado[]) => void;
}

interface EstadoOption {
  label: string;
  value: "ACTIVO" | "NO_ACTIVO" | "FALLECIDO" | "TRASLADADO";
}

export const BuscarColegiado = ({ onSearchResults }: BuscarColegiadoProps) => {

  const [selectedEstado, setSelectedEstado] = useState<boolean | null>(null);

  const [params, setParams] = useState<ParametrosBusqueda>({
    dni_colegiado: "",
    numero_colegiatura: "",
    apellido_paterno: "",
    estado_colegiado: null
  })

  // Renderiza cada item del dropdown de Estado
  const ItemDropdown = (option: EstadoOption) => (
    <div className="flex hover:bg-[#E6F3E6] text-[#00330a] font-nunito font-semibold items-center justify-between px-3 py-2">
      <span>{option.label}</span>
    </div>
  );


  const optionsEstado: EstadoOption[] = [
    { label: 'Activo', value: "ACTIVO" },
    { label: 'No Activo', value: "NO_ACTIVO" },
    { label: 'Fallecido', value: "FALLECIDO" },
    { label: 'Trasladado', value: "TRASLADADO" },
  ];

  // Maneja el cambio en los campos del formulario del busqueda de colegiado
  const handleChangeParams = (e: ChangeEvent<HTMLInputElement> | { name: string, value: string | null }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    const estado = params.estado_colegiado === "h" ? true : params.estado_colegiado === "nh" ? false : null;
    const res = await getHistorialColegiadoByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno, estado as boolean);
    onSearchResults(res.data.results);
  }

  return (
    <div className="mt-5 pb-5">
      <div className="bg-light shadow-custom-input rounded-2xl">
        <div className="flex flex-row space-x-5 p-4">
          <div className="w-2/6 flex flex-col">
            <label htmlFor="dni_colegiado" className="block font-nunito font-bold mb-1">Documento de identidad</label>
            <input
              type="number"
              id="dni_colegiado"
              name="dni_colegiado"
              onChange={handleChangeParams}
              value={params?.dni_colegiado}
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-lg shadow-custom-input focus:outline-none p-2"
              required
            />
          </div>
          <div className="w-2/6 flex flex-col">
            <label htmlFor="numero_colegiatura" className="block font-nunito font-bold mb-1">N° Colegiatura</label>
            <input
              type="number"
              id="numero_colegiatura"
              name="numero_colegiatura"
              onChange={handleChangeParams}
              value={params?.numero_colegiatura}
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-lg shadow-custom-input focus:outline-none p-2"
              required
            />
          </div>
          <div className="w-2/6 flex flex-col">
            <label htmlFor="apellido_paterno" className="block font-nunito font-bold mb-1">Apellido paterno</label>
            <input
              type="text"
              id="apellido_paterno"
              name="apellido_paterno"
              onChange={handleChangeParams}
              value={params?.apellido_paterno}
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-lg shadow-custom-input focus:outline-none p-2"
              required
            />
          </div>
          <div className="w-1/6 flex flex-col">
            <label htmlFor="estado" className="block font-nunito font-bold mb-1">Estado</label>
            <Dropdown
              id="estado"
              name="estado"
              className="w-full bg-[#ECF6E8] rounded-lg focus:outline-none shadow-custom-input p-2 px-2"
              panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.value);
                handleChangeParams({ name: 'estado_colegiado', value: e.value });
              }}
              options={optionsEstado}
              optionLabel="label"
              placeholder="Elegir..."
              itemTemplate={ItemDropdown}
            />
          </div>
          <button
            className="w-1/6 font-nunito font-bold bg-[#007336] text-white hover:bg-[#00330A] shadow-custom-input rounded-lg transition duration-300 space-x-1 mt-auto py-2"
            onClick={handleSearch}
          >
            <SearchIcon /> 
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
