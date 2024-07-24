import { useState } from "react";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

export function PublicacionesAdmin() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState<Nullable<Date>>(null);

  const options = [
    { label: 'Dni', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <Sidebar />

      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="mt-10 pb-5">
          <h4 className="text-4xl text-[#3A3A3A] font-nunito font-extrabold">Publicaciones</h4>
          <div className="w-full bg-[#EAF1E8] rounded-lg p-5 mt-5">
            <div className="flex flex-row justify-between mx-10">
              <div className="flex flex-col space-y-3">
                <span className="text-xl text-[#00330A] font-nunito font-bold">Categoria</span>
                <Dropdown
                  className="w-full text-[#5F4102] border-solid border-2 border-[#5F4102] rounded-xl items-center font-bold py-2 px-3"
                  panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.value)}
                  options={options}
                  optionLabel="label"
                  placeholder="Buscar por..."
                  itemTemplate={itemCategoria}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-xl text-[#00330A] font-nunito font-bold">Fecha de publicación</span>
                <input type="date" />
              </div>
              <div className="flex flex-col space-y-3">
              <input type="date" />
              <Calendar value={date} onChange={(e) => setDate(e.value)} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
