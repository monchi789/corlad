import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Pago } from '../../../../interfaces/model/Pago';
import { getPagoByFilters } from '../../../../api/pagos.api';

interface ParametrosBusqueda {
  dni_colegiado?: string,
  numero_colegiatura?: string,
  apellido_paterno?: string
}

interface BuscarPagoProps {
  onSearchResults: (results: Pago[]) => void;
}

export const BuscarPagos = ({ onSearchResults }: BuscarPagoProps) => {
  const [params, setParams] = useState<ParametrosBusqueda>({
    dni_colegiado: "",
    numero_colegiatura: "",
    apellido_paterno: ""
  })

  const handleChangeParams = (e: ChangeEvent<HTMLInputElement> | { name: string, value: any }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const res = await getPagoByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno);
      onSearchResults(res.data.results);
    } catch (error) {
      console.error("Error al buscar colegiados:", error);
    }
  }

  return (
    <div className="mt-5 pb-5">
      <div className="mt-5 bg-[#E1EBDE] shadow-custom-input rounded-2xl">
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 p-4">
          <div className="md:w-2/6 flex flex-col">
            <label htmlFor="dni_colegiado" className="block font-nunito font-bold mb-1">Documento de identidad</label>
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
          <div className="md:w-2/6 flex flex-col">
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
          <div className="md:w-2/6 flex flex-col">
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
          <div className="md:w-1/6 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full md:max-w-xs font-nunito font-semibold bg-[#007336] text-white hover:bg-[#00330A] shadow-custom-input rounded-xl transition duration-300 mt-auto py-2">
              <SearchIcon /> Buscar
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

