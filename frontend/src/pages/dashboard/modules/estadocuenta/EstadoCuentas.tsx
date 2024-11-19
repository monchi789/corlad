import { useState, useEffect } from "react";
import { BuscarEstadoCuenta } from "./BuscarEstadoCuenta";
import { ColumnDef } from '@tanstack/react-table';
import { EstadoCuenta } from "../../../../interfaces/EstadoCuenta";
import { getAllEstadosCuentas } from "../../../../api/estado.cuenta.api";
import SimpleTable from "../../components/ui/SimpleTable";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

type CustomColumnDef<T> = ColumnDef<T> & {
  isMoney?: boolean;
};

const columns: CustomColumnDef<EstadoCuenta>[] = [
  {
    header: 'Nombre',
    accessorKey: 'nombre',
    cell: info => info.getValue()
  },
  {
    header: 'Apellido paterno',
    accessorKey: 'apellido_paterno',
    cell: info => info.getValue()
  },
  {
    header: 'Apellido materno',
    accessorKey: 'apellido_materno',
    cell: info => info.getValue()
  },
  {
    header: 'Numero colegiatura',
    accessorKey: 'numero_colegiatura',
    cell: info => info.getValue()
  },
  {
    header: 'Monto S/.',
    accessorKey: 'monto_acumulado',
    isMoney: true,
    cell: info => {
      const value = info.getValue();
      return typeof value === 'number' ? `S/. ${value.toFixed(2)}` : value;
    }
  }
];

export default function EstadoCuentas() {
  const navigate = useNavigate();

  const [estadoCuentaList, setEstadoCuentaList] = useState<EstadoCuenta[]>([]);
  const [rows, ] = useState(10); // Número de noticias por página

  async function cargarEstadosCuentas(page = 0, pageSize = rows) {
    try {
      const res = await getAllEstadosCuentas(page, pageSize);
      setEstadoCuentaList(res.data.results);
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
    <>
        <div className="flex flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-gray-900 p-2"
          >
            <FaArrowCircleLeft className="mr-2" size={"30px"} />
          </button>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Estados de cuenta de los colegiados</h4>
        </div>

      <BuscarEstadoCuenta onSearchResults={handleSearchResults} />

      <SimpleTable<EstadoCuenta>
      columns={columns}
      data={estadoCuentaList}
      pagination={true}
      pageSize={10}
      />
    </>
  );
}
