import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { TableCards } from "../../shared/TableCards";
import Colegiado from "./Colegiado";

export function ColegiadosAdmin() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />

      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <Colegiado/>

        <TableCards/>
        

      </div>
    </div>
  )
}
