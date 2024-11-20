import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SimpleTable from "../../components/ui/SimpleTable";
import { ColumnDef } from '@tanstack/react-table';
import Spinner from "../../components/ui/Spinner";
import { defaultTarifa, Tarifa } from "../../../../interfaces/model/Tarifa";
import { getAllTarifas } from "../../../../api/tarifa.api";
import TarifasForm from "./TarifasForm";
import toast, { Toaster } from "react-hot-toast";
import { EliminarTarifa } from "./EliminarTarifa";

type CustomColumnDef<T> = ColumnDef<T> & {
  isMoney?: boolean;
};

const columns: CustomColumnDef<Tarifa>[] = [
  {
    header: 'Denominación',
    accessorKey: 'nombre_tarifa',
    cell: info => info.getValue()
  },
  {
    header: 'Descripción',
    accessorKey: 'descripcion_tarifa',
    cell: info => info.getValue()
  },
  {
    header: 'Monto S/.',
    accessorKey: 'precio_tarifa',
    isMoney: true,
    cell: info => {
      const value = info.getValue();
      return typeof value === 'number' ? `S/. ${value.toFixed(2)}` : value;
    }
  }
];

export default function TarifasPage() {
  const navigate = useNavigate();

  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [tarifa, setTarifa] = useState<Tarifa>(defaultTarifa);
  const [tarifaDeleted, setTarifaDeleted] = useState<Tarifa>(defaultTarifa);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isTarifaDeleteModalOpen, setIsTarifaDeleteModalOpen] = useState(false);

  const fetchTarifas = async () => {
    setIsLoading(true);

    try {
      const res = await getAllTarifas();
      setTarifas(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchTarifas();
  }, []);

  const handleTarifaSuccess = (success: boolean, godMessage: string, badMessage: string) => {
    if (success) {
      fetchTarifas();
      toast.success(godMessage);
    } else {
      toast.error(badMessage);
    }
  };

  const handleDeleteTarifa = async (tarifa: Tarifa) => {
    setTarifaDeleted(tarifa);
    setIsTarifaDeleteModalOpen(true);
  };

  const handleCloseTarifaDeleteModal = () => {
    setIsTarifaDeleteModalOpen(false);
  }

  const handleEdit = async (tarifa: Tarifa) => {
    setTarifa(tarifa);
  }

  const resetTarifa = () => {
    setTarifa(defaultTarifa);
  };

  return (
    <>
      <div className="flex flex-col pace-y-5">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <div className="flex flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 p-2"
            >
              <FaArrowCircleLeft className="mr-2" size={"30px"} />
            </button>
            <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Tarifas</h4>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full text-default font-nunito">

          <TarifasForm
            onTarifaAdded={(success: boolean) => handleTarifaSuccess(success, "Tarifa guardara con éxito", "Algo ha ocurrido al guardar la tarifa")}
            tarifa={tarifa}
            resetTarifa={resetTarifa}
          />

          <div className="w-px bg-gray-200 mx-10"></div>

          <div className="flex flex-col w-full lg:w-2/3 space-y-5 lg:mx-5 my-5 px-5">
            {isLoading ? (
              <Spinner />
            ) : !error ? (
              <SimpleTable<Tarifa>
                columns={columns}
                data={tarifas}
                includeActions={true}
                onEdit={handleEdit}
                onDelete={handleDeleteTarifa} />
            ) : <div className="text-red-500 font-bold mx-auto">Error al cargar la lista de tarifas. Problemas con el servidor</div>
            }
          </div>
        </div>
      </div>
      {tarifaDeleted && (
        <EliminarTarifa
          isOpen={isTarifaDeleteModalOpen}
          onClose={handleCloseTarifaDeleteModal}
          onTarifaDeleted={(success: boolean) => handleTarifaSuccess(success, "Tarifa eliminada con éxito", "Algo ha ocurrido al eliminar la tarifa")}
          tarifa={tarifaDeleted}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}
