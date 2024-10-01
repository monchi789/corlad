import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

// Definimos un tipo genérico para nuestros datos
type DataType = Record<string, any>;

interface ActionProps<T> {
  row: T;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

// Definimos los props de nuestro componente
interface SimpleTableProps<T extends DataType> {
  columns: ColumnDef<T>[];
  data: T[];
  includeActions?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const ActionButtons = <T extends DataType>({ row, onEdit, onDelete }: ActionProps<T>) => (
  <div className="flex space-x-2 justify-center">
    {onEdit && (
      <button
        onClick={() => onEdit(row)}
      >
        <FaEdit className="text-custom-yellow" size={"20px"}/>
      </button>
    )}
    {onDelete && (
      <button
        onClick={() => onDelete(row)}
      >
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
  onDelete
}: SimpleTableProps<T>) => {
  const tableColumns = React.useMemo(() => {
    if (includeActions) {
      return [
        ...columns,
        {
          id: 'actions',
          header: 'Acciones',
          cell: ({ row }) => (
            <ActionButtons
              row={row.original}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ),
        },
      ] as ColumnDef<T>[];
    }
    return columns;
  }, [columns, includeActions, onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-corlad">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="text-left text-sm font-bold text-white uppercase tracking-wider px-6 py-3 "
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
          {table.getRowModel().rows.map(row => (
            <tr className="w-full bg-custom-light-turquoise hover:bg-hover-light-turquoise transition duration-300" key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="text-sm text-black px-6 py-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;