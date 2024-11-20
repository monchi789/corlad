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
    <div className="bg-light shadow-custom-input rounded-2xl my-5 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <label htmlFor="dni_colegiado" className="block text-sm font-semibold text-gray-700 mb-2">Documento de identidad</label>
          <input
            type="number"
            id="dni_colegiado"
            name="dni_colegiado"
            onChange={handleChangeParams}
            value={params?.dni_colegiado}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-[#F1F9F1] border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="numero_colegiatura" className="block text-sm font-semibold text-gray-700 mb-2">N° Colegiatura</label>
          <input
            type="number"
            id="numero_colegiatura"
            name="numero_colegiatura"
            onChange={handleChangeParams}
            value={params?.numero_colegiatura}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-[#F1F9F1] border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="apellido_paterno" className="block text-sm font-semibold text-gray-700 mb-2">Apellido paterno</label>
          <input
            type="text"
            id="apellido_paterno"
            name="apellido_paterno"
            onChange={handleChangeParams}
            value={params?.apellido_paterno}
            className="w-full text-default font-nunito font-semibold placeholder-[#007336] bg-[#F1F9F1] border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-corlad focus:border-transparent px-3 py-2"
            required
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

