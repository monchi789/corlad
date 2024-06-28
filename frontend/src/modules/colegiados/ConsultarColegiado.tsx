import { Header } from "../../shared/components/Header";
import colegiado from "../../assets/corlad_logo.png"
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react";


export function ConsultarColegiado() {

  const [selectedOption, setSelectedOption] = useState(null)

  const options = [
    { label: 'Apellidos y nombres', value: 'apellidos-nombres' },
    { label: 'Dni', value: 'dni' },
    { label: 'N° de Colegiatura', value: 'colegiatura' },
  ];

  const itemCategoria = (option: any) => {
    return (
      <div className="px-3 py-2 hover:bg-[#E6F3E6] text-[#00330a] flex items-center justify-between">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto my-12 items-center">
        <h1 className="flex flex-col md:flex-row font-extrabold text-4xl font-nunito text-center text-[#A67102]">CONSULTAR&nbsp;<p className="text-[#363636]">HABILIDAD</p></h1>
        <div className="flex flex-col w-5/6 md:w-4/6 space-y-3 md:space-y-0 md:flex-row pt-12 lg:pt-24">
          <Dropdown className="w-full md:w-1/5 md:w-14rem p-3 bg-[#00330a] text-[#f0f0f0] rounded-s rounded-none items-center border-cyan-50"
            panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
            value={selectedOption} onChange={(e) => setSelectedOption(e.value)} options={options} optionLabel="label"
            placeholder="Buscar por..." itemTemplate={itemCategoria} />
          <input type="text" className="w-full md:w-3/5 focus:outline-none py-3 px-3 border-2 border-[#363636] rounded md:rounded-none md:rounded-r" />
          <button className="w-full md:w-1/5 bg-[#00330a] text-[#f0f0f0] md:ms-3 px-5 py-3 rounded">Buscar</button>
        </div>
      </div>


      <div className="mx-auto md:px-10">
        <div className="flex flex-col lg:flex-row mx-auto mb-12 lg:py-16 lg:my-24 w-4/5 rounded-lg shadow-xl">
          <img className="w-1/2 lg:w-1/4 mx-auto my-10 lg:my-0 lg:mx-24 rounded" src={colegiado} alt="Foto del colegiado" />
          <div className="w-full flex flex-col md:flex-row justify-centerspace-x-5 items-start me-24">
            <div className="w-full flex flex-col space-y-5 lg:space-y-10 px-5 pb-5 lg:pb-0">
              <div>
                <p className="text-[#a67102] font-semibold">Nombres</p>
                <p>Juan Manuel</p>
              </div>
              <div>
                <p className="text-[#a67102] font-semibold">Apellidos</p>
                <p>Perez Mamani</p>
              </div>
              <div>
                <p className="text-[#a67102] font-semibold">Número de colegiatura</p>
                <p>23456</p>
              </div>
              <div>
                <p className="text-[#a67102] font-semibold">Estado</p>
                <p>Habilitado</p>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-5 lg:space-y-10 px-5 pb-5 lg:pb-0">
              <div>
                <p className="text-[#a67102] font-semibold">Correo electrónico</p>
                <p>example@uandina.edu.pe</p>
              </div>

              <div>
                <p className="text-[#a67102] font-semibold">Capitulo</p>
                <p>Administracion</p>
              </div>
              <div>
                <p className="text-[#a67102] font-semibold">Sub especialidad</p>
                <p>Pública</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
