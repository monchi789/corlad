import { useState, useEffect } from "react";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { BuscarEstadoCuenta } from "./BuscarEstadoCuenta";
import { EstadoCuentaTable } from "./EstadoCuentaTable";
import { EstadoCuenta } from "../../../interfaces/model/EstadoCuenta";
import { getAllEstadosCuentas } from "../../../api/estado.cuenta.api";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { classNames } from "primereact/utils";

export default function EstadoCuentas() {
  const [estadoCuentaList, setEstadoCuentaList] = useState<EstadoCuenta[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10); // Número de noticias por página

  async function cargarEstadosCuentas(page = 0, pageSize = rows) {
    try {
      const res = await getAllEstadosCuentas(page, pageSize);
      setEstadoCuentaList(res.data.results);
      setTotalRecords(res.data.count);
    } catch (error) {
      console.error("Error fetching estado de cuenta:", error);
    }
  }

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    cargarEstadosCuentas(event.page, event.rows);
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

  useEffect(() => {
    cargarEstadosCuentas();
  }, []);

  const handleSearchResults = (results: EstadoCuenta[]) => {
    setEstadoCuentaList(results);
  };

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 mx-3 p-3">
        <SessionHeader />
        <div className="flex flex-col space-y-5 my-5">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Estados de cuenta</h4>
          </div>
        </div>

        <BuscarEstadoCuenta onSearchResults={handleSearchResults} />

        <EstadoCuentaTable estadoCuentaList={estadoCuentaList} />

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
  );
}
