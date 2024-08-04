import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { ColegiadoTable } from "./ColegiadoTable";
import { BuscarColegiado } from "./BuscarColegiado";

export function ColegiadosAdmin() {

  return (

    <div className="flex flex-row w-full">

      <Sidebar />

      <div className="w-full xl:w-4/5 m-3 p-3">

        <SessionHeader />
        
        <BuscarColegiado/>

        <ColegiadoTable/>
        
      </div>

    </div>
    
  )
}
