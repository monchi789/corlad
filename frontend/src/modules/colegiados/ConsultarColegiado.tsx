import { Header } from "../../shared/components/Header";
import colegiado from "../../assets/corlad_logo.png"

export function ConsultarColegiado() {
  return (
    <div>
      <Header />
      <div className="flex flex-col mx-auto my-12 items-center">
        <h1 className="flex flex-row font-extrabold text-4xl font-nunito"><span className="text-[#a67102]">COLEGIADOS</span>&nbsp;<span> - CONSULTAR HABILIDAD</span></h1>
        <div className="flex flex-row pt-24 w-4/6">
          <select className="block w-1/5 appearance-none hover:border-gray-500 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline bg-[#00330a] text-white px-3 py-1 rounded-s" name="opciones" id="opciones">
            <option className="bg-white text-black" value="apellidos-nombres">Apellidos o nombres</option>
            <option className="bg-white text-black" value="dni">Dni</option>
            <option className="bg-white text-black" value="categoria">N° de Colegiatura</option>
          </select>
          <input type="text" className="w-3/5 focus:outline-none rounded-r py-2 px-3 border-2 border-[#363636]	" />
          <button className="w-1/5 bg-[#00330a] text-white ms-3 px-5 py-1 rounded">Buscar</button>
        </div>
      </div>

      <div className="mx-auto px-10">
        <div className="flex flex-row mx-auto py-16 my-24 w-4/5 rounded-lg shadow-xl">
          <img className="w-1/4 mx-24 rounded" src={colegiado} alt="Foto del colegiado" />
          <div className="w-full flex flex-row justify-centerspace-x-5 items-start me-24">
            <div className="w-full flex flex-col space-y-10">
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
            <div className="w-full flex flex-col space-y-10">
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
