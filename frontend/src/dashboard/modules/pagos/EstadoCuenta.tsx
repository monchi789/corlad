import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";

export function EstadoCuenta() {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
      </div>
    </div>
  )
}