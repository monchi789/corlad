import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PagosTable } from "./PagosTable";

export function Pagos() {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col mt-10 space-y-5">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold">Pagos</h4>
            <div className="flex flex-row space-x-3">
              <button className="flex flex-row bg-[#007336] text-xl text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black	shadow-md rounded-2xl transition duration-300 space-x-4 px-8 py-2">
                <IoMdAddCircleOutline size={"30px"} />
                <span className="my-auto">Nuevo pago</span>
              </button>
            </div>
          </div>
        </div>

        <PagosTable />
        
      </div>
    </div>
  )
}