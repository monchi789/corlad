import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { PopUpsList } from "./PopUpsList";

export default function PopUpsAdmin() {
  return (
    <div className="flex flex-row w-full">
      
      <Sidebar />

      <div className="w-full xl:w-4/5 mx-3 p-3">

        <SessionHeader />

        <PopUpsList />

      </div>
    </div>
  )
}
