import { useState, useEffect } from "react";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { BuscarEstadoCuenta } from "./BuscarEstadoCuenta";
import { EstadoCuentaTable } from "./EstadoCuentaTable";
import { EstadoCuenta } from "../../../interfaces/model/EstadoCuenta";
import { getAllEstadosCuentas } from "../../../api/estado.cuenta.api";

export default function EstadoCuentas() {
  const [estadoCuentaList, setEstadoCuentaList] = useState<EstadoCuenta[]>([]);

  async function cargarEstadosCuentas() {
    try {
      const res = await getAllEstadosCuentas();
      setEstadoCuentaList(res.data);
    } catch (error) {
      console.error("Error fetching estado de cuenta:", error);
    }
  }

  useEffect(() => {
    cargarEstadosCuentas();
  }, []); 

  const handleSearchResults = (results: EstadoCuenta[]) => {
    setEstadoCuentaList(results);
  };

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col space-y-5 my-10">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Estados de cuenta</h4>
          </div>
        </div>

        <BuscarEstadoCuenta onSearchResults={handleSearchResults} />

        <EstadoCuentaTable estadoCuentaList={estadoCuentaList} />
      </div>
    </div>
  );
}
