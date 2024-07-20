import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { Colegiado } from "../../interfaces/model/Colegiado";
import { getAllColegiados } from "../../api/colegiado.api";

interface CardProps {
  imagen: string,
  nombres: string,
  apellidos: string,
  dni: string,
  numero_colegiatura: string,
  celular: string,
  estado: boolean,
  email: string
}

export function TableCards() {

  const [colegiadosList, setColegiados] = useState<Colegiado[]>([])

  const Card: React.FC<CardProps> = ({
    imagen,
    nombres,
    apellidos,
    dni,
    numero_colegiatura,
    celular,
    estado,
    email
  }) => {
    return (
      <div className="flex flex-row w-full justify-between text-base font-nunito font-semibold border-solid border-2 border-[#5F4102] rounded-2xl hover:bg-[#C9D9C6] transition duration-200 space-x-2 mt-5 p-3">
        <div className="w-2/6 flex flex-row space-x-3">
          <Avatar className="my-auto" image={imagen} size="xlarge" />
          <div className="flex flex-col">
            <p>{nombres}</p>
            <p>{apellidos}</p>
          </div>
        </div>
        <div className="w-1/6 my-auto">
          {dni}
        </div>
        <div className="w-1/6 my-auto">
          {numero_colegiatura}
        </div>
        <div className="w-1/6 my-auto">
          {celular}
        </div>
        <div className="w-1/6 text-[#5F4102] my-auto">
          {estado ? <FaCircleCheck size={"25px"} /> : <FaRegCircleCheck size={"25px"} />}
        </div>
        <div className="w-1/6 my-auto">
          {email}
        </div>
        <div className="flex flex-row w-1/6 text-[#8F650C] text-2xl space-x-3 justify-center my-auto">
          <button><FaEdit /></button>
          <button><FaTrashAlt /></button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    async function cargarColegiados() {
      const res = await getAllColegiados();
      /*
      const colegiadoList: Colegiado[] = res.data.map((element: any) => ({
        id: element.id,
        nombre_categoria: element.nombre_categoria,
      }));*/
      setColegiados(res.data);
    }
    cargarColegiados();
  }, []);

  return (
    <>
      <div className="flex flex-row w-full justify-between text-[#F9ECD9] font-nunito font-extrabold bg-[#5F4102] rounded-lg space-x-2 mt-5 py-3 px-3">
        <button className="w-2/6 text-start">Apellidos y nombres</button>
        <button className="w-1/6 text-start">Documento de identidad</button>
        <button className="w-1/6 text-start">N° colegiatura</button>
        <button className="w-1/6 text-start">N° celular</button>
        <button className="w-1/6 text-start">Estado</button>
        <button className="w-1/6 text-start">E-mail</button>
        <p className="w-1/6 text-center my-auto">Acciones</p>
      </div>
      <div>
        {colegiadosList.map((element, index) => (
          <Card key={index} imagen={import.meta.env.VITE_API_URL_ALTER+element.foto_colegiado}
            nombres={element.nombre}
            apellidos={element.apellido_paterno + ' ' + element.apellido_materno}
            dni={element.dni_colegiado}
            numero_colegiatura={element.numero_colegiatura}
            celular={element.celular}
            estado={element.estado}
            email={element.correo} />
        ))}
      </div>
    </>
  )
}
