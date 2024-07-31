import { useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { TableCards } from "../../shared/TableCards";
import { EstadoCuenta } from "../../../interfaces/model/EstadoCuenta";
import { getAllEstadosCuentas } from "../../../api/estado.cuenta.api";

export function EstadoCuentaTable() {
  const [estadoCuentaList, setEstadoCuenta] = useState<EstadoCuenta[]>([]);

  useEffect(() => {
    async function cargarEstadosCuentas() {
      const res = await getAllEstadosCuentas();
      setEstadoCuenta(res.data);
    }
    cargarEstadosCuentas();
  }, []);

  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "Documento de identidad", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "N° colegiatura", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
    { header: "Fecha actualización", accessor: "celular", className: 'w-1/6 text-start' },
    { header: "Estado de cuenta", accessor: "estado", className: 'w-1/6 text-start' }
  ];

  const renderRow = (estado: EstadoCuenta) => (
    <>
      <div className="w-2/6 flex flex-row space-x-3">
        <Avatar className="my-auto" shape="circle" image={import.meta.env.VITE_API_URL_ALTER + estado.id_colegiado.foto_colegiado} size="xlarge" />
        <div className="flex flex-col">
          <p>{estado.id_colegiado.nombre}</p>
          <p>{estado.id_colegiado.apellido_paterno + ' ' + estado.id_colegiado.apellido_materno}</p>
        </div>
      </div>
      <div className="w-1/6 my-auto">{estado.id_colegiado.dni_colegiado}</div>
      <div className="w-1/6 my-auto">{estado.id_colegiado.numero_colegiatura}</div>
      <div className="w-1/6 my-auto">{estado.fecha_actualizacion}</div>
      <div className="w-1/6 my-auto">{estado.saldo}</div>
    </>
  );

  return <TableCards columns={columns} data={estadoCuentaList} renderRow={renderRow} />;
}
