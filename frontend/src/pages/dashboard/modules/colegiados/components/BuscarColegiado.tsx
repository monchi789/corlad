import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Dropdown } from 'primereact/dropdown';
import { HistorialColegiado } from '../../../../../interfaces/model/HistorialColegiado';
import { getHistorialColegiadoByFilters } from '../../../../../api/historial.colegiado.api';

interface ParametrosBusqueda {
  dni_colegiado?: string,
  numero_colegiatura?: string,
  apellido_paterno?: string,
  estado_activo?: string
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
    estado_activo: ""
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
    const res = await getHistorialColegiadoByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno, params.estado_activo);
    onSearchResults(res.data.results);
  }

  return (
    <div className="bg-light shadow-custom-input rounded-2xl my-5 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="col-span-1">
          <label htmlFor="dni_colegiado" className="block text-sm font-semibold text-gray-700 mb-2">
            Documento de identidad
          </label>
          <input
            type="number"
            id="dni_colegiado"
            name="dni_colegiado"
            onChange={handleChangeParams}
            value={params?.dni_colegiado}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-default-input border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="numero_colegiatura" className="block text-sm font-semibold text-gray-700 mb-2">
            N° Colegiatura
          </label>
          <input
            type="number"
            id="numero_colegiatura"
            name="numero_colegiatura"
            onChange={handleChangeParams}
            value={params?.numero_colegiatura}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-default-input border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="apellido_paterno" className="block text-sm font-semibold text-gray-700 mb-2">
            Apellido paterno
          </label>
          <input
            type="text"
            id="apellido_paterno"
            name="apellido_paterno"
            onChange={handleChangeParams}
            value={params?.apellido_paterno}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-default-input border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <Dropdown
            id="estado"
            name="estado"
            className="w-full bg-default-input border border-gray-300 rounded-lg p-2"
            panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
            value={selectedEstado}
            onChange={(e) => {
              setSelectedEstado(e.value);
              handleChangeParams({ name: "estado_activo", value: e.value });
            }}
            options={optionsEstado}
            optionLabel="label"
            placeholder="Elegir..."
            itemTemplate={ItemDropdown}
          />
        </div>

        <div className="col-span-1 flex items-end">
          <button
            className="w-full font-nunito font-bold border-solid border-2 border-default hover:bg-corlad hover:border-corlad hover:text-white rounded-lg transition duration-300 space-x-1 py-2"

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
