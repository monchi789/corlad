import { Link } from 'react-router-dom';
import { HistorialColegiado } from '../../../../interfaces/model/HistorialColegiado';
import default_user from '../../../../assets/web/person_perfil.webp'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import { BiSolidUserDetail } from "react-icons/bi";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';

interface ColegiadoTableProps {
  colegiadosList: HistorialColegiado[];
  onView: (colegiado: HistorialColegiado) => void;
  onDelete: (colegiado: HistorialColegiado) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function ColegiadoTable({
  colegiadosList,
  onView,
  onDelete,
  currentPage,
  pageSize,
  totalPages,
  totalResults,
  onPageChange,
  onPageSizeChange
}: ColegiadoTableProps) {
  const columns: ColumnDef<HistorialColegiado>[] = [
    {
      header: "N°",
      cell: ({ row }) => (
        <div className="text-center">
          {row.index + 1}
        </div>
      ),
    },
    {
      header: "Apellidos y nombres",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <img
            src={
              row.original.id_colegiado.foto_colegiado
                ? `${import.meta.env.VITE_API_URL_ALTER}${row.original.id_colegiado.foto_colegiado}`
                : default_user
            } 
            alt="Foto del colegiado"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>
            {`${row.original.id_colegiado.apellido_paterno} ${row.original.id_colegiado.apellido_materno}, ${row.original.id_colegiado.nombre}`}
          </span>
        </div>
      ),
    },
    {
      header: "DNI",
      accessorKey: "id_colegiado.dni_colegiado",
    },
    {
      header: "REGUC",
      accessorKey: "id_colegiado.numero_colegiatura",
    },
    {
      header: "N° Celular",
      accessorKey: "id_colegiado.celular",
    },
    {
      header: "Estado",
      accessorKey: "id_colegiado.estado_activo",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.id_colegiado.estado_activo == "ACTIVO" ? (
            <FaCircleCheck className="text-[#007336] mx-auto" size={"25px"} />
          ) : (
            <IoIosCloseCircle className="text-[#B50C0C] mx-auto" size={"30px"} />
          )}
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "id_colegiado.correo",
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-3">
          <button type="button" onClick={() => onView(row.original)}>
            <BiSolidUserDetail className="text-green-600" size={"35px"} />
          </button>
          <button type="button">
            <Link to={`/admin/colegiado/editar-colegiado/${row.original.id}/${row.original.id_colegiado.id}`}>
              <FaEdit className="text-yellow-500" size={"30px"} />
            </Link>
          </button>
          <button type="button" onClick={() => onDelete(row.original)}>
            <FaTrashAlt className="text-red-500" size={"25px"} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: colegiadosList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex: currentPage, pageSize });
        onPageChange(newState.pageIndex);
        onPageSizeChange(newState.pageSize);
      }
    },
  });

  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalResults);

  return (
    <div className="overflow-x-auto shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 font-nunito">
        <thead className="bg-corlad">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={`text-sm text-white font-bold uppercase tracking-wider p-3 py-3 ${header.id === "N°" || header.id === "id_colegiado_estado_activo" || header.id === "Acciones" ? 'text-center' : 'text-start'}`}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-300">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center bg-light text-gray-500 p-4">
                No hay ningún elemento en la lista
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr
                className="bg-white hover:bg-light transition duration-200"
                key={row.id}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="whitespace-nowrap font-semibold text-default p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{startIndex}</span> a <span className="font-medium">{endIndex}</span> de{' '}
              <span className="font-medium">{totalResults}</span> resultados
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Anterior</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Siguiente</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
