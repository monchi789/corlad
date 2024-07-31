// Definir los props para el header de la columna
interface Column {
  header: string;
  accessor: string;
  className?: string; // Clases adicionales
}

interface GenericTableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (row: T) => React.ReactNode; // Para poder renderizar otro componente
}

export function TableCards<T>({ columns, data, renderRow }: GenericTableProps<T>) {
  return (
    <>
      <div className="flex flex-row w-full justify-between text-[#FFFFFF] font-nunito font-extrabold bg-[#007336] rounded-lg space-x-2 py-3 px-5">
        {columns.map((col, index) => (
          <button
            key={index}
            className={`${col.className}`} // Aplicar clases adicionales al header de la tabla
          >
            {col.header}
          </button>
        ))}
      </div>
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row w-full justify-between text-base font-nunito font-semibold border-solid border-2 border-[#5F4102] rounded-2xl hover:bg-[#C9D9C6] transition duration-200 space-x-2 mt-3 p-3"
          >
            {renderRow(item)}
          </div>
        ))}
      </div>
    </>
  );
}
