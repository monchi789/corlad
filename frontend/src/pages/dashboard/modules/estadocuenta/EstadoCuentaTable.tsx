import { TableCards } from "../../components/TableCards";
import { EstadoCuenta } from "../../../../interfaces/EstadoCuenta";

interface EstadoCuentaTableProps {
  estadoCuentaList: EstadoCuenta[];
}

export function EstadoCuentaTable({ estadoCuentaList }: EstadoCuentaTableProps) {
  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "Documento de identidad", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "N° colegiatura", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
    { header: "Fecha actualización", accessor: "fecha_actualizacion", className: 'w-1/6 text-start' },
    { header: "Estado de cuenta", accessor: "estado", className: 'w-1/6 text-start' }
  ];

  const renderRow = (estado: EstadoCuenta) => (
    <>
      <div className="w-2/6 flex flex-row space-x-3">
        <div className="flex flex-col">
          <p>{estado.nombre}</p>
          <p>{estado.apellido_paterno + ' ' + estado.apellido_materno}</p>
        </div>
      </div>
      <div className="w-1/6 my-auto">{estado.numero_colegiatura}</div>
      <div className="w-1/6 my-auto">S/. {estado.monto_acumulado}</div>
    </>
  );

  return <TableCards columns={columns} data={estadoCuentaList} renderRow={renderRow} />;
}
