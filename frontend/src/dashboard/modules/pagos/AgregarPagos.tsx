import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import cash_illustration from "../../../assets/dashboard/money_illustration.png"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getColegiadoByFilters } from "../../../api/colegiado.api";
import { Colegiado, defaultColegiado } from "../../../interfaces/model/Colegiado";
import { defaultPago, MetodoPago, Pago, TipoPago } from "../../../interfaces/model/Pago";
import { createPago, getMetodoPagoByFilter, getTipoPagoByFilter } from "../../../api/pagos.api";
import toast, { Toaster } from "react-hot-toast";

export default function AgregarPagos() {
  const navigate = useNavigate();

  const [dniColegiado, setDniColegiado] = useState('');
  const [numeroColegiatura, setNumeroColegiatura] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedColegiado, setSelectedColegiado] = useState<string>(''); // Estado para mostrar el colegiado
  const [selectedTipoPago, setSelectedTipoPago] = useState('');
  const [selectedMetodoPago, setSelectedMetodoPago] = useState('');

  const [colegiadoData, setColegiadoData] = useState<Colegiado>(defaultColegiado) // Estado para guardar el colegiado buscado

  const [pagoData, setPagoData] = useState<Pago & { monto_pago_entero: string, monto_pago_decimal: string }>({
    ...defaultPago,
    monto_pago_entero: '',
    monto_pago_decimal: ''
  });

  const handleChangeTipoPago = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedTipoPago(event.target.value);
  };

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
      } else {
        setSelectedColegiado('No se encontró ningún colegiado con esos parámetros');
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
      const resTipoPago = await getTipoPagoByFilter(selectedTipoPago)
      const resMetodoPago = await getMetodoPagoByFilter(selectedMetodoPago)

      const tipoPago: TipoPago = resTipoPago.data[0]
      const metodoPago: MetodoPago = resMetodoPago.data[0]

      pagoData.id_colegiado = colegiadoData
      pagoData.id_tipo_pago = tipoPago
      pagoData.id_metodo_pago = metodoPago

      await createPago(pagoData);

      toast.success('Pago registrado exitosamente');
      navigate("/admin/pagos")
    } catch (error) {
      toast.error('Error al crear el pago');
    }

  }

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-4/5 m-3 p-3">
        <SessionHeader />
        <form className="flex flex-col w-full mt-10" onSubmit={handleSubmit}>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold mb-5">Nuevo pago</h4>
          <div className="flex flex-row ms-5 mb-5">
            <div className="flex flex-col w-full lg:w-2/3">
              <div className="bg-[#C9D9C6] text-[#00330A] rounded-2xl px-5 py-5 mb-5">
                <div className="flex flex-col space-y-3">
                  <span className="text-xl font-nunito font-extrabold">Colegiado:</span>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-row font-nunito font-bold space-x-7">
                      <input
                        type="number"
                        id="dni_colegiado"
                        name="dni_colegiado"
                        className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl p-1 px-2"
                        placeholder="N° Dni"
                        value={dniColegiado}
                        onChange={(e) => setDniColegiado(e.target.value)}
                      />
                      <span className="my-auto">y/o</span>
                      <input
                        type="number"
                        id="numero_colegiatura"
                        name="numero_colegiatura"
                        className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl p-1 px-2"
                        placeholder="N° colegiatura"
                        value={numeroColegiatura}
                        onChange={(e) => setNumeroColegiatura(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="flex flex-row text-md text-white font-nunito font-semibold shadow-md rounded-2xl bg-[#007336] hover:bg-[#00330A] transition duration-300 space-x-4 px-8 py-2"                    >
                        <span className="my-auto">Buscar</span>
                      </button>
                    </div>
                    {loading && <p>Loading...</p>}
                    <input
                      value={loading ? "" : selectedColegiado}
                      className="bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-bold shadow-[#B8B195] shadow-md rounded-lg p-2"
                      placeholder="Colegiado que realizó el pago"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="text-[#00330A] rounded-2xl px-5 py-2">
                <div className="flex flex-row w-full space-x-10 mb-5">
                  <div className="w-1/2 space-y-2">
                    <label htmlFor="numero_operacion" className="w-full text-xl font-nunito font-extrabold block my-auto">Numero de operacion:</label>
                    <input
                      type="number"
                      id="numero_operacion"
                      name="numero_operacion"
                      value={pagoData.numero_operacion}
                      onChange={handleChangePago}
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
                      onChange={handleChangePago}
                      className="w-full bg-[#ECF6E8] focus:outline-none shadow-[#B8B195] shadow-md rounded-xl py-2 px-3"
                      placeholder="0000"
                      min={0}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-xl font-nunito font-extrabold">Tipo de pago:</span>
                  <div className="flex flex-row w-full justify-between">
                    <RadioGroup
                      row
                      aria-labelledby="pagos-row-radio-buttons-group"
                      name="row-radio-buttons-group"
                      className="w-full justify-between"
                      value={selectedTipoPago}
                      onChange={handleChangeTipoPago}
                    >
                      <FormControlLabel className="w-1/5" value="mensualidad" control={<Radio
                        sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                      />} label={<span className="text-[#5F4102] font-semibold">Mensualidad</span>} />

                      <FormControlLabel className="w-1/5" value="matricula" control={<Radio
                        sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                      />} label={<span className="text-[#5F4102] font-semibold">Matrícula</span>} />

                      <FormControlLabel className="w-1/5" value="multa" control={<Radio
                        sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                      />} label={<span className="text-[#5F4102] font-semibold">Multa</span>} />

                      <FormControlLabel className="w-1/5" value="extraordinario" control={<Radio
                        sx={{ color: '#5F4102', '&.Mui-checked': { color: '#5F4102' } }}
                      />} label={<span className="text-[#5F4102] font-semibold">Extraordinario</span>} />

                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="text-[#00330A] rounded-2xl px-5 py-4">
                <div className="flex flex-col space-y-2">
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
            </div>
            <img className="w-1/3 hidden lg:block mx-5" src={cash_illustration} alt="Ilustracion sobre pagos" />
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
            <button type="button" className="w-1/6 bg-[#ECF6E8] text-[#3A3A3A] border-2 border-[#3A3A3A] rounded-2xl">Cancelar</button>
          </div>
        </form>
        <Toaster
          position="bottom-center"
          reverseOrder={false} />
      </div>
    </div>
  )
}

