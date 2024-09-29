import { FaArrowCircleLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function TarifasPage() {
  const navigate = useNavigate();


  return (
    <>

      <div className="flex flex-col md:flex-row my-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-gray-900 p-2"
        >
          <FaArrowCircleLeft className="mr-2" size={"30px"}/>
        </button>
        <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Tarifas</h4>
      </div>

      <div className="flex flex-row w-full font-nunito">
        <div className="flex flex-col w-1/2 space-y-10">
          <span className="text-center text-xl font-bold">Crear nueva tarifa</span>
          <div className="space-y-2">
            <label htmlFor="nombre_tarifa" className="block font-semibold mb-1">Denominación de la tarifa</label>
            <input
              type="text"
              id="nombre_tarifa"
              name="nombre_tarifa"
              className="w-full bg-[#ECF6E8] rounded-md focus:outline-none shadow-custom-input p-2"
              placeholder="Denominación de la tarifa..."
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="descripcion" className="block font-semibold mb-1">Descripción</label>
            <textarea
              name="descripcion"
              id="descripcion"
              rows={6}
              className="w-full bg-[#ECF6E8] resize-none focus:outline-none shadow-custom-input rounded-md p-2"
              placeholder="Describir la tarifa..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nombre_tarifa" className="block font-semibold mb-1">Monto de la tarifa</label>
            <div className="flex flex-row space-x-5">
              <span className="text-xl my-auto">S/.</span>
              <input
                type="number"
                id="monto_pago_entero"
                name="monto_pago_entero"
                className="w-full bg-[#ECF6E8] focus:outline-none shadow-custom-input rounded-md p-2"
                placeholder="0000"
                min={0}
                required
              />
              <span className="text-xl my-auto">.</span>
              <input
                type="number"
                id="monto_pago_decimal"
                name="monto_pago_decimal"
                className="w-1/2 bg-[#ECF6E8] focus:outline-none shadow-custom-input rounded-md p-2"
                placeholder="00"
                min={0}
                max={99}
                required
              />
            </div>
          </div>
          <button className="flex flex-row bg-[#007336] text-lg text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-2 mx-auto px-4 py-1">
            <IoMdAddCircleOutline className="my-auto" size={"25px"} />
            <span className="my-auto">Agregar tarifa</span>
          </button>
        </div>

        <div className="w-px bg-gray-200 mx-10"></div>

        <div className="flex flex-col w-1/2 bg-[#E1EBDE] rounded-md shadow-custom-input space-y-5 p-5">
          <span className="text-center text-xl font-bold">Lista de tarifas</span>
          <table className="border-collapse min-w-full rounded-full font-nunito">
            <thead className="bg-[#00330A] rounded-full">
              <tr className="text-white">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-right">Monto</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-[#ECF6E8]">
              <tr>
                <td className="px-4 py-2">Tarifa Básica</td>
                <td className="px-4 py-2 text-right">$50.00</td>
                <td className="text-right space-x-2 px-4 py-2">
                  <button><FaEdit size={"25px"} className="text-custom-yellow" /></button>
                  <button><FaTrashAlt size={"25px"} className="text-[#B50C0C]" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}