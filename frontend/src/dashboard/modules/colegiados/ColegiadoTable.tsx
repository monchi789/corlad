import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { Colegiado } from "../../../interfaces/model/Colegiado";
import { getAllColegiados } from "../../../api/colegiado.api";
import { TableCards } from "../../shared/TableCards";

export function ColegiadoTable() {
  const [colegiadosList, setColegiados] = useState<Colegiado[]>([]);

  useEffect(() => {
    async function cargarColegiados() {
      const res = await getAllColegiados();
      setColegiados(res.data.results);
    }
    cargarColegiados();
  }, []);

  const columns = [
    { header: "Apellidos y nombres", accessor: "fullName", className: 'w-2/6 text-start' },
    { header: "Documento de identidad", accessor: "dni", className: 'w-1/6 text-start' },
    { header: "N° colegiatura", accessor: "numero_colegiatura", className: 'w-1/6 text-start' },
    { header: "N° celular", accessor: "celular", className: 'w-1/6 text-start' },
    { header: "Estado", accessor: "estado", className: 'w-1/6 text-start' },
    { header: "E-mail", accessor: "email", className: 'w-1/6 text-start' },
    { header: "Acciones", accessor: "actions", className: 'w-1/6 text-center' } // Class for actions column
  ];

  const renderRow = (colegiado: Colegiado) => (
    <>
      <div className="w-2/6 flex flex-row space-x-3">
        <Avatar className="my-auto" shape="circle" image={import.meta.env.VITE_API_URL_ALTER + colegiado.foto_colegiado} size="xlarge" />
        <div className="flex flex-col">
          <p>{colegiado.nombre}</p>
          <p>{colegiado.apellido_paterno + ' ' + colegiado.apellido_materno}</p>
        </div>
      </div>
      <div className="w-1/6 my-auto">{colegiado.dni_colegiado}</div>
      <div className="w-1/6 my-auto">{colegiado.numero_colegiatura}</div>
      <div className="w-1/6 my-auto">{colegiado.celular}</div>
      <div className="w-1/6 text-[#5F4102] my-auto">
        {colegiado.estado ? <FaCircleCheck className="text-[#007336]" size={"25px"} /> : <IoIosCloseCircle className="text-[#B50C0C]" size={"30px"} />}
      </div>
      <div className="w-1/6 my-auto">{colegiado.correo}</div>
      <div className="flex flex-row w-1/6 text-[#8F650C] text-2xl space-x-3 justify-center my-auto">
        <button><FaEdit size={"25px"} /></button>
        <button><FaTrashAlt size={"25px"} className="text-[#B50C0C]" /></button>
      </div>
    </>
  );

  return <TableCards columns={columns} data={colegiadosList} renderRow={renderRow} />;
}
