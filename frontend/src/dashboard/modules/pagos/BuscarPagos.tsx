import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Colegiado } from '../../../interfaces/model/Colegiado';
import { getColegiadoByFilters } from '../../../api/colegiado.api';

interface ParametrosBusqueda {
  dni_colegiado?: string,
  numero_colegiatura?: string,
  apellido_paterno?: string
}

export const BuscarPagos = () => {
  const navigate = useNavigate();

  const [, setColegiadosListSearch] = useState<Colegiado[]>([])

  const [params, setParams] = useState<ParametrosBusqueda>({
    dni_colegiado: "",
    numero_colegiatura: "",
    apellido_paterno: ""
  })

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
      const res = await getColegiadoByFilters(params.numero_colegiatura, params.dni_colegiado, params.apellido_paterno);
      setColegiadosListSearch(res.data.results);
      navigate('/admin/colegiado/', { state: { colegiadosListSearch: res.data.results } });
    } catch (error) {
      console.error("Error al buscar colegiados:", error);
    }
  }
  

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
          <button onClick={handleSearch} className="w-1/6  font-nunito font-black bg-[#007336] text-[#F9ECD9] rounded-xl mt-auto py-2"><SearchIcon /> Buscar</button>
        </div>
      </div>
    </div>
  );
};
