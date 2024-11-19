import { useCallback, useEffect, useState } from "react";
import { BuscarColegiado } from "./BuscarColegiado";
import ColegiadoTable from "./ColegiadoTable";
import { HistorialColegiado } from "../../../../interfaces/model/HistorialColegiado";
import { deleteHistorialColegiadoById, getAllHistorialColegiado } from "../../../../api/historial.colegiado.api";
import { Link, useNavigate } from 'react-router-dom';
import { PersonAdd } from '@mui/icons-material';
import { FaArrowCircleLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ColegiadosAdmin() {
  const navigate = useNavigate();

  const [colegiadosList, setColegiadosList] = useState<HistorialColegiado[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedColegiado, setSelectedColegiado] = useState<HistorialColegiado | null>(null);

  const handleDeleteColegiado = async (id: number): Promise<void> => {
    try {
      await deleteHistorialColegiadoById(id);
      await cargarColegiados(currentPage, pageSize);
      toast.success("Colegiado eliminado con éxito");
    } catch (error) {
      toast.error("Error eliminando colegiado");
    }
  };

  // Actualiza la función openModal
  const openModal = (colegiado: HistorialColegiado) => {
    setSelectedColegiado(colegiado);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedColegiado(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedColegiado !== null) {
      handleDeleteColegiado(selectedColegiado.id);
      closeModal();
    }
  };


  const cargarColegiados = useCallback(
    async (page = 0, size = pageSize) => {
      try {
        const res = await getAllHistorialColegiado(page, size);
        setColegiadosList(res.data.results);
        setTotalResults(res.data.count);
        setTotalPages(Math.ceil(res.data.count / size));
      } catch (error) {
        console.error("Error fetching colegiados:", error);
      }
    },
    [pageSize]
  );

  const handleSearchResults = (data: HistorialColegiado[]) => {
    setColegiadosList(data);
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
    cargarColegiados(currentPage, pageSize);
  }, [cargarColegiados, currentPage, pageSize]);

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
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Colegiados</h4>
        </div>
        <Link className="flex flex-row space-x-3 my-auto" to={"/admin/colegiado/nuevo-colegiado"}>
          <button className="flex flex-row bg-[#007336] text-lg text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-3 px-4 py-1">
            <PersonAdd className="my-auto" />
            <span className="my-auto">Nuevo colegiado</span>
          </button>
        </Link>
      </div>

      <BuscarColegiado onSearchResults={handleSearchResults} />

      <ColegiadoTable
        colegiadosList={colegiadosList}
        onDelete={openModal}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Modal para eliminar el colegiado */}
      {showModal && selectedColegiado && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="font-nunito bg-white rounded-lg shadow-lg z-10 p-6">
            <h2 className="text-xl font-bold mb-4">Eliminar colegiado</h2>
            <p>¿Está seguro de que desea eliminar al colegiado <strong>{`${selectedColegiado.id_colegiado.apellido_paterno} ${selectedColegiado.id_colegiado.apellido_materno}, ${selectedColegiado.id_colegiado.nombre}`}</strong>?</p>
            <p>N° Colegiatura: <strong>{selectedColegiado.id_colegiado.numero_colegiatura}</strong></p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white rounded hover:bg-gray-600  px-4 py-2 "
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="bottom-center"
        reverseOrder={false} />
    </>
  )
}
