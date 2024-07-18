import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { useEffect, useState } from "react";
import { Colegiado } from "../../../interfaces/model/Colegiado";
import { getAllColegiados } from "../../../api/colegiado.api";
import { TableCards } from "../../shared/TableCards";
import Colegiado2 from "./Colegiado";

export function ColegiadosAdmin() {
  const [colegiados, setColegiados] = useState<Colegiado[]>([]);

  useEffect(() => {
    getAllColegiados()
      .then(res => {
        setColegiados(res.data)
        console.log(res.data)
      });
  }, []);



  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />

      <div className="w-3/4 m-3 p-3">
        <SessionHeader />
        <Colegiado2/>

        <TableCards/>
        

      </div>
    </div>
  )
}
