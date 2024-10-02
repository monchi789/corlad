import { IoMdAddCircleOutline } from "react-icons/io";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { PagosTable } from "./PagosTable";
import { Link, useNavigate } from "react-router-dom";
import { BuscarPagos } from "./BuscarPagos";
import { useEffect, useState } from "react";
import { Pago } from "../../../interfaces/model/Pago";
import { getAllPagos } from "../../../api/pagos.api";
import { classNames } from "primereact/utils";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Pagos() {
  const navigate = useNavigate();

  const [pagosList, setPagosList] = useState<Pago[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10); // Número de noticias por página

  async function cargarPagos(page = 0, pageSize = rows) {
    try {
      const res = await getAllPagos(page, pageSize);
      setPagosList(res.data.results);
      setTotalRecords(res.data.count);
    } catch (error) {
      console.error("Error fetching estado de cuenta:", error);
    }
  }

  // Función para manejar el cambio de página
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    cargarPagos(event.page, event.rows);
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

  const handleSearchResults = (data: Pago[]) => {
    setPagosList(data);
  };

  useEffect(() => {
    cargarPagos();
  }, []);



  return (
    <>
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
        <div className="flex flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-gray-900 p-2"
          >
            <FaArrowCircleLeft className="mr-2" size={"30px"} />
          </button>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Administración de pagos</h4>
        </div>
        <div className="flex flex-row space-x-3 my-auto">
          <Link className="flex flex-row space-x-3 my-auto" to={"/admin/pagos/nuevo-pago"}>
            <button className="flex flex-row w-full justify-center bg-corlad text-lg text-white font-nunito font-semibold hover:bg-hover-corlad shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-50 space-x-3 my-auto px-4 py-1">
              <IoMdAddCircleOutline className="my-auto" size={"25px"} />
              <span className="my-auto">Nuevo pago</span>
            </button>
          </Link>
        </div>
      </div>

      <BuscarPagos onSearchResults={handleSearchResults} />

      <PagosTable pagosList={pagosList} />

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