import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SimpleTable from "../../components/SimpleTable";
import { ColumnDef } from '@tanstack/react-table';
import Spinner from "../../components/ui/Spinner";
import { Tarifa } from "../../../interfaces/model/Tarifa";
import { getAllTarifas } from "../../../api/tarifa.api";
import TarifasForm from "./TarifasForm";

const columns: ColumnDef<Tarifa>[] = [
  {
    header: 'Denominación',
    accessorKey: 'nombre_tarifa',
  },
  {
    header: 'Monto',
    accessorKey: 'precio_tarifa',
  },
  {
    header: 'Descripción',
    accessorKey: 'descripcion_tarifa'
  }
]

export default function TarifasPage() {
  const navigate = useNavigate();

  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTarifas = async () => {
    setIsLoading(true);

    try {
      const res = await getAllTarifas();
      setTarifas(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchTarifas();
  }, []);


  const handleEdit = async () => {

  }

  const handleDelete = async () => {

  }

  return (
    <>
      <div className="flex flex-col my-5 space-y-5">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <div className="flex flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 p-2 my-auto"
            >
              <FaArrowCircleLeft className="mr-2" size={"30px"} />
            </button>
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Tarifas</h4>
          </div>
        </div>

        <div className="flex flex-row w-full font-nunito">

          <TarifasForm />

          <div className="w-px bg-gray-200 mx-10"></div>

          <div className="flex flex-col w-2/3 space-y-5 p-5">
            <span className="text-center text-xl font-bold">Lista de tarifas</span>
            {isLoading ? (
              <Spinner />
            ) : !error ? (
              <SimpleTable<Tarifa>
                columns={columns}
                data={tarifas}
                includeActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete} />
            ) : <div className="text-red-500 font-bold mx-auto">Error al cargar las tarifas. Problemas con el servidor</div>
            }
          </div>
        </div>
      </div>

    </>
  )
}