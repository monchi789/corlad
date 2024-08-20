import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getEstadoCuentaByFilters } from '../../../api/estado.cuenta.api';
import { EstadoCuenta } from '../../../interfaces/model/EstadoCuenta';

interface ParametrosBusqueda {
  dni_colegiado?: string;
  numero_colegiatura?: string;
  apellido_paterno?: string;
}

interface BuscarEstadoCuentaProps {
  onSearchResults: (results: EstadoCuenta[]) => void;
}

export const BuscarEstadoCuenta = ({ onSearchResults }: BuscarEstadoCuentaProps) => {
  const [params, setParams] = useState<ParametrosBusqueda>({
    dni_colegiado: "",
    numero_colegiatura: "",
    apellido_paterno: ""
  });

  const handleChangeParams = (e: ChangeEvent<HTMLInputElement> | { name: string, value: any }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const res = await getEstadoCuentaByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno);
      onSearchResults(res.data);
    } catch (error) {
      console.error("Error fetching colegiados:", error);
    }
  };

  return (
    <div className="mt-10 pb-5">
      <div className="mt-5 bg-[#E1EBDE] rounded-2xl">
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
          <button onClick={handleSearch} className="w-1/6 font-nunito font-bold bg-[#007336] text-white rounded-xl mt-auto py-2"><SearchIcon /> Buscar</button>
        </div>
      </div>
    </div>
  );
};
