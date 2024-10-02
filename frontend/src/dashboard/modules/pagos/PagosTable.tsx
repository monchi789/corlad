import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Avatar } from "primereact/avatar";
import { TableCards } from "../../components/TableCards";
import { Pago } from "../../../interfaces/model/Pago";

interface PagosProps {
  pagosList: Pago[];
}

export function PagosTable({ pagosList }: PagosProps) {
  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "DNI", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "Metodo de pago", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
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
      <div className="w-1/6 my-auto">S./.{pago.monto_total}</div>
      <div className="w-1/6 my-auto">{pago.observacion}</div>
      <div className="flex flex-row w-1/6 text-[#8F650C] justify-center my-auto">
        <button><Link to={`/admin/pagos/editar-pago/${pago.id}`}><FaEdit size={"25px"} /></Link></button>
      </div>
    </>
  );

  return <TableCards columns={columns} data={pagosList} renderRow={renderRow} />;
}
