import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { ColegiadoTable } from "./ColegiadoTable";
import { BuscarColegiado } from "./BuscarColegiado";
import { useEffect, useState } from "react";
import { HistorialColegiado } from "../../../interfaces/model/HistorialColegiado";
import { getAllHistorialColegiado } from "../../../api/historial.colegiado.api";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { classNames } from "primereact/utils";

export default function ColegiadosAdmin() {
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

    <div className="flex flex-row w-full">

      <Sidebar />

      <div className="w-full xl:w-4/5 mx-3 p-3">

        <SessionHeader />

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

      </div>
    </div>
  )
}
