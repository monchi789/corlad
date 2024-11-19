import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  Row,
  CellContext,
} from '@tanstack/react-table';

type DataType = Record<string, any>;

type CustomColumnDef<T> = ColumnDef<T> & {
  isMoney?: boolean;
};

interface ActionProps<T> {
  row: T;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

interface SimpleTableProps<T extends DataType> {
  columns: CustomColumnDef<T>[];
  data: T[];
  includeActions?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pagination?: boolean;
  pageSize?: number;
}

const ActionButtons = <T extends DataType>({ row, onEdit, onDelete }: ActionProps<T>) => (
  <div className="flex space-x-2 justify-center">
    {onEdit && (
      <button type="button" onClick={() => onEdit(row)}>
        <FaEdit className="text-custom-yellow" size={"20px"} />
      </button>
    )}
    {onDelete && (
      <button type="button" onClick={() => onDelete(row)}>
        <FaTrashAlt className="text-red-500" size={"20px"} />
      </button>
    )}
  </div>
);

const SimpleTable = <T extends DataType>({
  columns,
  data,
  includeActions = false,
  onEdit,
  onDelete,
  pagination = false,
  pageSize = 10,
}: SimpleTableProps<T>) => {
  const tableColumns = React.useMemo(() => {
    const formattedColumns = columns.map((column) => ({
      ...column,
      cell: (info: CellContext<T, unknown>) => {
        const value = info.getValue() as React.ReactNode;
        if (column.isMoney) {
          return (
            <div className="text-right">
              <span>S/. </span>
              {typeof value === 'number' ? value.toFixed(2) : value}
            </div>
          );
        }
        return flexRender(column.cell, info);
      },
    }));

    if (includeActions) {
      return [
        ...formattedColumns,
        {
          id: 'actions',
          header: 'Acciones',
          cell: ({ row }: { row: Row<T> }) => (
            <ActionButtons row={row.original} onEdit={onEdit} onDelete={onDelete} />
          ),
        },
      ] as CustomColumnDef<T>[];
    }

    return formattedColumns;
  }, [columns, includeActions, onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 font-nunito">
        <thead className="bg-corlad">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-sm font-bold text-white text-start uppercase tracking-wider px-6 py-3"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-300">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (includeActions ? 1 : 0)} className="text-center bg-light text-gray-500 p-4">
                No hay ningún elemento en la lista
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="w-full bg-custom-light-turquoise hover:bg-dark-light-turquoise transition duration-300">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-sm text-black px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-1 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{' '}
                <span className="font-medium">{table.getState().pagination.pageIndex * pageSize + 1}</span>{' '}
                a{' '}
                <span className="font-medium">
                  {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, data.length)}
                </span>{' '}
                de <span className="font-medium">{data.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
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
      )}
    </div>
  );
};

export default SimpleTable;