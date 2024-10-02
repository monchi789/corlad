import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
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
}: SimpleTableProps<T>) => {
  const tableColumns = React.useMemo(() => {
    const formattedColumns = columns.map((column) => ({
      ...column,
      cell: (info: any) => {
        const value = info.getValue();
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
          cell: ({ row }) => (
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
                  className="text-sm font-bold text-white text-center uppercase tracking-wider px-6 py-3"
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
          {data.length === 0 ? (
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
    </div>
  );
};

export default SimpleTable;
