import { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import PagosTable from "./PagosTable";
import { Link, useNavigate } from "react-router-dom";
import { BuscarPagos } from "./BuscarPagos";
import { Pago } from "../../../../interfaces/model/Pago";
import { getAllPagos } from "../../../../api/pagos.api";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Pagos() {
  const navigate = useNavigate();

  const [pagosList, setPagosList] = useState<Pago[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const cargarPagos = useCallback(
    async (page = 0, size = pageSize) => {
      try {
        const res = await getAllPagos(page, size);
        setPagosList(res.data.results);
        setTotalResults(res.data.count);
        setTotalPages(Math.ceil(res.data.count / size));
      } catch (error) {
        console.error("Error fetching colegiados:", error);
      }
    },
    [pageSize]
  );

  const handleSearchResults = (data: Pago[]) => {
    setPagosList(data);
    setCurrentPage(0);
    setTotalPages(1);
    setTotalResults(data.length);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  };

  useEffect(() => {
    cargarPagos(currentPage, pageSize);
  }, [cargarPagos, currentPage, pageSize]);

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

      <PagosTable
        pagosList={pagosList}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  )
}