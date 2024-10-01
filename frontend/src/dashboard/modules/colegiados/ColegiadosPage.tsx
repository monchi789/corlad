import { ColegiadoTable } from "./ColegiadoTable";
import { BuscarColegiado } from "./BuscarColegiado";
import { useEffect, useState } from "react";
import { HistorialColegiado } from "../../../interfaces/model/HistorialColegiado";
import { getAllHistorialColegiado } from "../../../api/historial.colegiado.api";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Link, useNavigate } from 'react-router-dom';
import { PersonAdd } from '@mui/icons-material';
import { classNames } from "primereact/utils";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function ColegiadosAdmin() {
  const navigate = useNavigate();

  const [colegiadosList, setColegiadosList] = useState<HistorialColegiado[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10); // Número de noticias por página

  async function cargarColegiados(page = 0, pageSize = rows) {
    try {
      const res = await getAllHistorialColegiado(page, pageSize);
      setColegiadosList(res.data.results);
      setTotalRecords(res.data.count);
    } catch (error) {
      console.error("Error fetching estado de cuenta:", error);
    }
  }

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    cargarColegiados(event.page, event.rows);
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

  const handleSearchResults = (data: HistorialColegiado[]) => {
    setColegiadosList(data);
  };

  const handleDeleteColegiado = (id: number) => {
    setColegiadosList((prevList) => prevList.filter((colegiado) => colegiado.id !== id));
  };

  useEffect(() => {
    cargarColegiados();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between mt-5">
        <div className="flex flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-gray-900 p-2"
          >
            <FaArrowCircleLeft className="mr-2" size={"30px"} />
          </button>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Colegiados</h4>
        </div>
        <Link className="flex flex-row space-x-3 my-auto" to={"/admin/colegiado/nuevo-colegiado"}>
          <button className="flex flex-row bg-[#007336] text-lg text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-3 px-4 py-1">
            <PersonAdd className="my-auto" />
            <span className="my-auto">Nuevo colegiado</span>
          </button>
        </Link>
      </div>

      <BuscarColegiado onSearchResults={handleSearchResults} />

      <ColegiadoTable colegiadosList={colegiadosList} onDelete={handleDeleteColegiado} />

      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="space-x-5 mt-5"
        template={template}
      />
    </>
  )
}
