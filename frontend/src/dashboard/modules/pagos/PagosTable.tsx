import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { TableCards } from "../../shared/TableCards";
import { Pago } from "../../../interfaces/model/Pago";
import { getAllPagos } from "../../../api/pagos.api";

export function PagosTable() {
  const [pagosList, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    async function cargarPagos() {
      const res = await getAllPagos();
      setPagos(res.data);
    }
    cargarPagos();
  }, []);

  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "Documento de identidad", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "Metodo de pago", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
    { header: "Tipo de pago", accessor: "celular", className: 'w-1/6 text-start' },
    { header: "Cantidad pagada", accessor: "estado", className: 'w-1/6 text-start' },
    { header: "Descripción", accessor: "email", className: 'w-1/6 text-start' },
    { header: "Acciones", accessor: "actions", className: 'w-1/6 text-center' }
  ];

  const renderRow = (pago: Pago) => (
    <>
      <div className="w-2/6 flex flex-row space-x-3">
        <Avatar className="my-auto" shape="circle" image={import.meta.env.VITE_API_URL_ALTER + pago.id_colegiado.foto_colegiado} size="xlarge" />
        <div className="flex flex-col">
          <p>{pago.id_colegiado.nombre}</p>
          <p>{pago.id_colegiado.apellido_paterno + ' ' + pago.id_colegiado.apellido_materno}</p>
        </div>
      </div>
      <div className="w-1/6 my-auto">{pago.id_colegiado.dni_colegiado}</div>
      <div className="w-1/6 my-auto">{pago.id_metodo_pago.nombre_metodo_pago}</div>
      <div className="w-1/6 my-auto">{pago.id_tipo_pago.nombre_tipo_pago}</div>
      <div className="w-1/6 my-auto">{pago.monto_pago}</div>
      <div className="w-1/6 my-auto">{pago.observacion}</div>
      <div className="flex flex-row w-1/6 text-[#8F650C] text-2xl space-x-3 justify-center my-auto">
        <button><FaEdit size={"25px"} /></button>
        <button><FaTrashAlt size={"25px"} className="text-[#B50C0C]" /></button>
      </div>
    </>
  );

  return <TableCards columns={columns} data={pagosList} renderRow={renderRow} />;
}
