import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { ImagesList } from "../../shared/ImagesList";

export function PopUpsAdmin() {
  return (
    <div className="flex flex-row w-full bg-[#ECF6E8]">
      <Sidebar />  
      <div className="w-3/4 m-3 p-3">
      <SessionHeader />
      <ImagesList />
      </div>
    </div>
  )
}
