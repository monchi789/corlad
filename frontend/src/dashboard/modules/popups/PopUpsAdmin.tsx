import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { ImagesList } from "../../shared/ImagesList";

export function PopUpsAdmin() {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />  
      <div className="w-4/5 m-3 p-3">
      <SessionHeader />
      <ImagesList tipo={"popup"} />
      </div>
    </div>
  )
}
