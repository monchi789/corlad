import {  useState } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { Avatar } from "primereact/avatar";
import { TableCards } from "../../shared/TableCards";
import toast from "react-hot-toast";
import { HistorialColegiado } from "../../../interfaces/model/HistorialColegiado";
import { deleteHistorialColegiadoById } from "../../../api/historial.colegiado.api";

interface ColegiadoTableProps {
  colegiadosList: HistorialColegiado[];
  onDelete: (id: number) => void;

}

export function ColegiadoTable({ colegiadosList, onDelete }: ColegiadoTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedColegiadoId, setSelectedColegiadoId] = useState<number | null>(null);

  const handleDeleteColegiado = async (id: number): Promise<void> => {
    try {
      await deleteHistorialColegiadoById(id);
      onDelete(id); // Notifica al componente padre para actualizar la lista
      toast.success("Colegiado eliminado con éxito");
    } catch (error) {
      console.error("Error deleting colegiado:", error);
      toast.error("Error eliminando colegiado");
    }
  };

  const openModal = (id: number) => {
    setSelectedColegiadoId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedColegiadoId(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedColegiadoId !== null) {
      handleDeleteColegiado(selectedColegiadoId);
      closeModal();
    }
  };

  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "Documento de identidad", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "N° colegiatura", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
    { header: "N° celular", accessor: "celular", className: 'w-1/6 text-start' },
    { header: "Estado", accessor: "estado", className: 'w-1/6 text-start' },
    { header: "E-mail", accessor: "email", className: 'w-1/6 text-start' },
    { header: "Acciones", accessor: "actions", className: 'w-1/6 text-center' } // Class for actions column
  ];

  const renderRow = (colegiado: HistorialColegiado) => (
    <>
      <div className="w-2/6 flex flex-row space-x-3">
        <Avatar className="my-auto" shape="circle" image={import.meta.env.VITE_API_URL_ALTER + colegiado.id_colegiado.foto_colegiado} size="xlarge" />
        <div className="flex flex-col">
          <p>{colegiado.id_colegiado.nombre}</p>
          <p>{colegiado.id_colegiado.apellido_paterno + ' ' + colegiado.id_colegiado.apellido_materno}</p>
        </div>
      </div>
      <div className="w-1/6 my-auto">{colegiado.id_colegiado.dni_colegiado}</div>
      <div className="w-1/6 my-auto">{colegiado.id_colegiado.numero_colegiatura}</div>
      <div className="w-1/6 my-auto">{colegiado.id_colegiado.celular}</div>
      <div className="w-1/6 my-auto">
        {colegiado.id_estado_colegiatura?.estado_colegiatura ? (
          <FaCircleCheck className="text-[#007336]" size={"25px"} />
        ) : (
          <IoIosCloseCircle className="text-[#B50C0C]" size={"30px"} />
        )}
      </div>
      <div className="w-1/6 my-auto">{colegiado.id_colegiado.correo}</div>
      <div className="flex flex-row w-1/6 text-[#8F650C] text-2xl space-x-3 justify-center my-auto">
        <button><Link to={`/admin/colegiado/editar-colegiado/${colegiado.id}/${colegiado.id_colegiado.id}`}><FaEdit size={"25px"} /></Link></button>
        <button onClick={() => openModal(colegiado.id)}><FaTrashAlt size={"25px"} className="text-[#B50C0C]" /></button>
      </div>
    </>
  );

  return (
    <>
      <TableCards columns={columns} data={colegiadosList} renderRow={renderRow} />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Está seguro de que desea eliminar este colegiado?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
