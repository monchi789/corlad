import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonAdd } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { HistorialColegiado } from '../../../interfaces/model/HistorialColegiado';
import { getHistorialColegiadoByFilters } from '../../../api/historial.colegiado.api';

interface ParametrosBusqueda {
  dni_colegiado?: string,
  numero_colegiatura?: string,
  apellido_paterno?: string,
  estado?: boolean | string | null
}

export const BuscarColegiado = () => {
  const navigate = useNavigate();

  const [selectedEstado, setSelectedEstado] = useState<boolean | null>(null);
  const [, setColegiadosListSearch] = useState<HistorialColegiado[]>([])

  const [params, setParams] = useState<ParametrosBusqueda>({
    dni_colegiado: "",
    numero_colegiatura: "",
    apellido_paterno: "",
    estado: null
  })

  // Renderiza cada item del dropdown de Estado
  const ItemDropdown = (option: any) => (
    <div className="flex hover:bg-[#E6F3E6] text-[#00330a] font-nunito font-semibold items-center justify-between px-3 py-2">
      <span>{option.label}</span>
    </div>
  );
  

  const optionsEstado = [
    {label: 'Hábil', value: "h" },
    {label: 'No Hábil', value: "nh" },
  ];

  // Maneja el cambio en los campos del formulario del busqueda de colegiado
   const handleChangeParams = (e: ChangeEvent<HTMLInputElement> | { name: string, value: any }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const estado = params.estado === "h" ? true : params.estado === "nh" ? false : null;
      const res = await getHistorialColegiadoByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno, estado as boolean);
      setColegiadosListSearch(res.data);
      navigate('/admin/colegiado/', { state: { colegiadosListSearch: res.data } });
    } catch (error) {
      console.error("Error al buscar colegiado:", error);
    }
  }
  
  return (
    <div className="mt-10 pb-5">
      <div className="flex flex-col space-y-5 my-10">
        <div className="flex flex-row justify-between">
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Colegiados</h4>
          <div className="flex flex-row space-x-3">
            <Link to={"/admin/colegiado/nuevo-colegiado"}>
              <button className="flex flex-row bg-[#007336] text-xl text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black	shadow-md rounded-2xl transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-4 px-8 py-2">
                <PersonAdd />
                <span className="my-auto">Nuevo colegiado</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 bg-[#E1EBDE] shadow-custom-input rounded-2xl">
        <div className="flex flex-row space-x-5 p-5">
          <div className="w-2/6 flex flex-col">
            <label htmlFor="dni_colegiado" className="block font-nunito font-bold mb-1">DNI</label>
            <input
              type="number"
              id="dni_colegiado"
              name="dni_colegiado"
              onChange={handleChangeParams}
              value={params?.dni_colegiado}
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl shadow-custom-input focus:outline-none p-2"
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
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl shadow-custom-input focus:outline-none p-2"
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
              className="w-full bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-xl shadow-custom-input focus:outline-none p-2"
              required
            />
          </div>
          <div className="w-1/6 flex flex-col">
            <label htmlFor="estado" className="block font-nunito font-bold mb-1">Estado</label>
            <Dropdown
              id="estado"
              name="estado"
              className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none shadow-custom-input p-2 px-2"
              panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
              value={selectedEstado}
              onChange={(e) => {
                setSelectedEstado(e.value);
                handleChangeParams({ name: 'estado', value: e.value });
              }}
              options={optionsEstado}
              optionLabel="label"
              placeholder="Elegir..."
              itemTemplate={ItemDropdown}
            />
          </div>
          <button onClick={handleSearch} className="w-1/6  font-nunito font-black bg-[#007336] text-[#F9ECD9] rounded-xl mt-auto py-2"><SearchIcon /> Buscar</button>
        </div>
      </div>
    </div>
  );
};
