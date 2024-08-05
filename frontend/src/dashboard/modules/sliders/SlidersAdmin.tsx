import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { SlidersList } from "./SlidersList";

export function SlidersAdmin() {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />  
      <div className="w-full xl:w-4/5 m-3 p-3">
      <SessionHeader />
      <SlidersList />
      </div>
    </div>
  )
}
