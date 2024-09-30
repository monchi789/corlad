import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getColegiadoByFilters } from "../../../api/colegiado.api";
import { Colegiado, defaultColegiado } from "../../../interfaces/model/Colegiado";
import { defaultPago, MetodoPago, Pago } from "../../../interfaces/model/Pago";
import { createPago, getMetodoPagoByFilter } from "../../../api/pagos.api";
import toast, { Toaster } from "react-hot-toast";
import { Dropdown } from "primereact/dropdown";
import { Tarifa } from "../../../interfaces/model/Tarifa";
import { getAllTarifas } from "../../../api/tarifa.api";

export default function AgregarPagos() {
  const navigate = useNavigate();

  const [dniColegiado, setDniColegiado] = useState('');
  const [numeroColegiatura, setNumeroColegiatura] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorColegiado, setErrorColegiado] = useState(false);
  const [selectedColegiado, setSelectedColegiado] = useState<string>(''); // Estado para mostrar el colegiado
  const [selectedTarifa, setSelectedTarifa] = useState('');
  const [tarifaData, setTarifaData] = useState<Tarifa[]>([]);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState('');

  const [colegiadoData, setColegiadoData] = useState<Colegiado>(defaultColegiado) // Estado para guardar el colegiado buscado

  const [pagoData, setPagoData] = useState<Pago & { monto_pago_entero: string, monto_pago_decimal: string }>({
    ...defaultPago,
    monto_pago_entero: '',
    monto_pago_decimal: '00'
  });

  // Renderiza cada item del dropdown de categoría
  const itemDropdown = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  // Carga la lista de Tarifas
  useEffect(() => {
    async function cargarTarifas() {
      const res = await getAllTarifas();
      setTarifaData(res.data);
    }
    cargarTarifas();
  }, []);

  const handleChangeMetodoPago = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMetodoPago(event.target.value);
  };

  const handleSearch = async () => {
    if (dniColegiado.trim() === '' && numeroColegiatura.trim() === '') {
      setSelectedColegiado('Por favor, llene algún campo.');
      return; // Detiene la ejecución si los campos están vacios
    }

    setLoading(true);

    try {
      const res = await getColegiadoByFilters(numeroColegiatura, dniColegiado);

      if (res.data.results.length > 0) {
        const colegiado: Colegiado = res.data.results[0];
        setSelectedColegiado(`${colegiado.numero_colegiatura} - ${colegiado.apellido_paterno} - ${colegiado.apellido_materno} - ${colegiado.nombre} - ${colegiado.dni_colegiado}`); // Ajusta esto según la estructura de tu dato
        setColegiadoData(colegiado)
        setErrorColegiado(false)
      } else {
        setSelectedColegiado('No se encontró ningún colegiado con esos parámetros');
        setErrorColegiado(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Maneja el cambio en los campos del formulario de pago
  const handleChangePago = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'monto_pago_entero' || name === 'monto_pago_decimal') {
      const entero = name === 'monto_pago_entero' ? value : pagoData.monto_pago_entero;
      const decimal = name === 'monto_pago_decimal' ? value : pagoData.monto_pago_decimal;
      const monto_pago = parseFloat(`${entero}.${decimal}`) || 0;

      setPagoData(prevState => ({
        ...prevState,
        [name]: value,
        monto_pago
      }));
    } else if (name === 'observacion') {
      setPagoData(prevState => ({
        ...prevState,
        observacion: value
      }));
    } else {
      setPagoData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resMetodoPago = await getMetodoPagoByFilter(selectedMetodoPago)

      const metodoPago: MetodoPago = resMetodoPago.data[0]

      pagoData.id_colegiado = colegiadoData
      pagoData.id_metodo_pago = metodoPago

      await createPago(pagoData);

      toast.success('Pago registrado exitosamente');
      navigate("/admin/pagos")
    } catch (error: any) {
      if (error.response) {
        // Si el servidor respondió con un código de estado que no es 2xx
        const serverErrors = error.response.data;
        console.log(error)
        // Extrae los errores específicos y muéstralos
        if (serverErrors.id_colegiado_id) {
          setErrorColegiado(true)
        }
        if (serverErrors.meses) {
          toast.error(`Error en el número de meses: ${serverErrors.meses[0]}`);
        }
        else {
          // Muestra otros errores generales
          toast.error(`Error del servidor: ${serverErrors.message || 'Error desconocido'}`);
        }

      } else if (error.request) {
        // Si no se recibió respuesta
        toast.error('No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        // Otros errores
        toast.error(`Error al crear colegiado: ${error.message}`);
      }
    }

  }

  return (
    <>
      <form className="flex flex-col w-full my-5" onSubmit={handleSubmit}>
        <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold mb-5">Nuevo pago</h4>
        <div className="flex flex-row mb-5">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="flex flex-col bg-[#C9D9C6] text-[#00330A] rounded-2xl space-y-3 p-4 mb-5">
              <span className="text-xl font-nunito font-extrabold">Buscar colegiado:</span>
              <div className="flex flex-col">
                <div className="flex flex-row font-nunito font-bold space-x-7 mb-5">
                  <input
                    type="number"
                    id="dni_colegiado"
                    name="dni_colegiado"
                    className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-lg p-1 px-2"
                    placeholder="N° Dni"
                    value={dniColegiado}
                    onChange={(e) => setDniColegiado(e.target.value)}
                  />
                  <span className="my-auto">y/o</span>
                  <input
                    type="number"
                    id="numero_colegiatura"
                    name="numero_colegiatura"
                    className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-lg p-1 px-2"
                    placeholder="N° colegiatura"
                    value={numeroColegiatura}
                    onChange={(e) => setNumeroColegiatura(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="flex flex-row text-md text-white font-nunito font-semibold shadow-md rounded-lg bg-[#007336] hover:bg-[#00330A] transition duration-300 space-x-4 px-8 py-2"                    >
                    <span className="my-auto">Buscar</span>
                  </button>
                </div>
                {loading && <p>Cargando...</p>}
                <input
                  value={loading ? "" : selectedColegiado}
                  className="bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-bold shadow-[#B8B195] shadow-md rounded-lg mb-3 p-2"
                  placeholder="Colegiado que realizó el pago"
                  disabled
                />
                {errorColegiado && <p className="text-red-500 text-center font-nunito font-bold">Por favor buscar al colegiado que ingresó el pago</p>}
              </div>
            </div>
            <div className="text-[#00330A] rounded-2xl px-5 py-2">
              <div className="flex flex-row w-full space-x-10 mb-5">
                <div className="w-1/2 space-y-2">
                  <label htmlFor="numero_operacion" className="w-full text-xl font-nunito font-extrabold block my-auto">Numero de operación:</label>
                  <input
                    type="number"
                    id="numero_operacion"
                    name="numero_operacion"
                    value={pagoData.numero_operacion}
                    onChange={() => handleChangePago}
                    className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl py-2 px-3"
                    placeholder="0000"
                    min={0}
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <label htmlFor="meses" className="w-full text-xl font-nunito font-extrabold block my-auto">Cantidad de meses:</label>
                  <input
                    type="number"
                    id="meses"
                    name="meses"
                    value={pagoData.meses}
                    onChange={() => handleChangePago}
                    className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl py-2 px-3"
                    placeholder="0000"
                    min={0}
                    max={999}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[#00330A] rounded-2xl space-y-2 px-5 py-4">
              <span className="text-xl font-nunito font-extrabold">Método de pago:</span>
              <div className="flex flex-row w-full justify-between">
                <RadioGroup
                  row
                  aria-labelledby="pagos-row-radio-buttons-group"
                  name="row-radio-buttons-group"
                  className="w-full justify-between"
                  value={selectedMetodoPago}
                  onChange={handleChangeMetodoPago}
                >
                  <FormControlLabel className="w-1/5" value="efectivo" control={<Radio
                    sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                  />} label={<span className="text-[#5F4102] font-semibold">Efectivo</span>} />

                  <FormControlLabel className="w-1/5" value="deposito" control={<Radio
                    sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                  />} label={<span className="text-[#5F4102] font-semibold">Depósito</span>} />

                  <FormControlLabel className="w-1/5" value="yape" control={<Radio
                    sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                  />} label={<span className="text-[#5F4102] font-semibold">Yape</span>} />

                  <FormControlLabel className="w-1/5" value="plin" control={<Radio
                    sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                  />} label={<span className="text-[#5F4102] font-semibold">Plin</span>} />

                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/3 bg-[#C9D9C6] rounded-lg mx-5 p-4">
            <Dropdown
              id="sexo_colegiado"
              name="sexo_colegiado"
              className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input p-1 px-2"
              panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
              value={selectedTarifa}
              onChange={(e) => setSelectedTarifa(e.value)}
              options={tarifaData}
              placeholder="Elegir..."
              itemTemplate={itemDropdown}
              required
            />
            <table className="border-collapse min-w-full rounded-full font-nunito">
              <thead className="bg-[#00330A] rounded-full">
                <tr className="text-white">
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Tarifa Básica</td>
                  <td className="px-4 py-2 text-right">$50.00</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-5">
          <div className="flex flex-col w-full h-full bg-[#C9D9C6] text-[#00330A] rounded-2xl space-y-10 p-7">
            <div className="flex flex-row space-x-5">
              <label htmlFor="monto_pago" className="w-full text-xl font-nunito font-extrabold block my-auto">Monto del pago:</label>
              <span className="text-xl my-auto">S/.</span>
              <input
                type="number"
                id="monto_pago_entero"
                name="monto_pago_entero"
                value={pagoData.monto_pago_entero}
                onChange={handleChangePago}
                className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl py-2 px-3"
                placeholder="0000"
                min={0}
                required
              />
              <span className="text-xl my-auto">.</span>
              <input
                type="number"
                id="monto_pago_decimal"
                name="monto_pago_decimal"
                value={pagoData.monto_pago_decimal}
                onChange={handleChangePago}
                className="w-1/2 bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl py-2 px-3"
                placeholder="00"
                min={0}
                max={99}
                required
              />
            </div>
            <div className="flex flex-row space-x-5">
              <label htmlFor="fecha_pago" className="w-full text-xl font-nunito font-extrabold block my-auto">Fecha de pago:</label>
              <input
                type="date"
                id="fecha_pago"
                name="fecha_pago"
                value={pagoData.fecha_pago}
                onChange={handleChangePago}
                className="w-full bg-[#ECF6E8] rounded-xl focus:outline-none focus:shadow-custom-input py-2 px-3"
                required
              />
            </div>
          </div>
          <div className="w-full bg-[#C9D9C6] text-[#00330A] rounded-2xl px-5 py-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="observacion" className="w-full text-xl font-nunito font-extrabold block mb-1">Observación:</label>
              <textarea
                name="observacion"
                id="observacion"
                rows={4}
                className="bg-[#ECF6E8] border-solid border border-[#5F4102] resize-none focus:outline-none rounded-lg p-2"
                value={pagoData.observacion}
                onChange={handleChangePago}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end text-md font-nunito font-bold space-x-5 mt-5 me-5">
          <button type="submit" className="w-2/6 bg-[#007336] text-white hover:bg-[#00330A] shadow-md rounded-2xl transition duration-300 space-x-4 px-8 py-2">Guardar pago</button>
          <Link to={"/admin/pagos"} className="w-1/6">
            <button type="button" className="w-full border-solid border-2 border-[#3A3A3A] rounded-2xl py-3">
              Cancelar
            </button>
          </Link>
        </div>
      </form>
      <Toaster
        position="bottom-center"
        reverseOrder={false} />
    </>
  )
}

