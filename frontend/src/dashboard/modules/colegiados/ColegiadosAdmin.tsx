import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { ColegiadoTable } from "./ColegiadoTable";
import { BuscarColegiado } from "./BuscarColegiado";
import { useEffect, useState } from "react";
import { HistorialColegiado } from "../../../interfaces/model/HistorialColegiado";
import { getAllHistorialColegiado } from "../../../api/historial.colegiado.api";

export default function ColegiadosAdmin() {
  const [colegiadosList, setColegiadosList] = useState<HistorialColegiado[]>([]);

  async function cargarEstadosCuentas() {
    try {
      const res = await getAllHistorialColegiado();
      setColegiadosList(res.data);
    } catch (error) {
      console.error("Error fetching estado de cuenta:", error);
    }
  }

  useEffect(() => {
    cargarEstadosCuentas();
  }, []); 

  const handleSearchResults = (results: HistorialColegiado[]) => {
    setColegiadosList(results);
  };

  const handleDeleteColegiado = (id: number) => {
    setColegiadosList((prevList) => prevList.filter((colegiado) => colegiado.id !== id));
  };
  return (

    <div className="flex flex-row w-full">

      <Sidebar />

      <div className="w-full xl:w-4/5 m-3 p-3">

        <SessionHeader />
        
        <BuscarColegiado onSearchResults={handleSearchResults}/>

        <ColegiadoTable colegiadosList={colegiadosList} onDelete={handleDeleteColegiado}/>
        
      </div>

    </div>
    
  )
}
