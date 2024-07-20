import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";

export function PublicacionesAdmin() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />

      <div className="w-3/4 m-3 p-3">
        <SessionHeader />

        

      </div>
    </div>
  )
}
