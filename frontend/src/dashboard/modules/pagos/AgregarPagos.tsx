import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Colegiado, defaultColegiado } from "../../../interfaces/model/Colegiado";
import { defaultPago, MetodoPago, Pago } from "../../../interfaces/model/Pago";
import { createPago, getMetodoPagoByFilter } from "../../../api/pagos.api";
import toast, { Toaster } from "react-hot-toast";
import { Tarifa } from "../../../interfaces/model/Tarifa";
import { getAllTarifas } from "../../../api/tarifa.api";
import AsyncSelect from "react-select/async"
import makeAnimated from 'react-select/animated';
import SimpleTable from "../../components/SimpleTable";
import { ColumnDef } from "@tanstack/react-table";
import { MultiValue } from 'react-select';
import { FaArrowCircleLeft } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form"
import ErrorSpan from "../../components/ui/ErrorSpan";
import BuscarColegiadoPagos from "./BuscarColegiadoPagos";

const animatedComponents = makeAnimated();

interface Option {
  value: Tarifa;
  label: string;
}

interface FormData {
  numero_operacion: string;
  fecha_pago: string;
  observacion: string;
  monto_pago_decimal: number;
}


export default function AgregarPagos() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const [errorColegiado, setErrorColegiado] = useState(false);
  const [colegiado, setColegiado] = useState<Colegiado | null>(null);
  const [selectedTarifaList, setSelectedTarifaList] = useState<Tarifa[]>([]);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState('');

  const [colegiadoData, setColegiadoData] = useState<Colegiado>(defaultColegiado) // Estado para guardar el colegiado buscado
  const [isLoading, setIsLoading] = useState(false);

  // Calcular el monto total
  const totalMonto = selectedTarifaList.reduce((acc, tarifa) => acc + Number(tarifa.precio_tarifa), 0);

  const cargarTarifas = async () => {
    try {
      const res = await getAllTarifas();
      const tarifas: Tarifa[] = res.data.results;

      // Transforma la data de tarifa como un select
      return tarifas.map(tarifa => ({
        value: tarifa,
        label: `${tarifa.nombre_tarifa} - S/.${tarifa.precio_tarifa}`,
      }));
    } catch (error) {
      return [];
    }
  };

  const handleChangeMetodoPago = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMetodoPago(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)

    const resMetodoPago = await getMetodoPagoByFilter(selectedMetodoPago)

    const metodoPago: MetodoPago = resMetodoPago.data[0]

    const ids = selectedTarifaList.map((tarifa) => tarifa.id);

    const pago: Pago = {
      id: 0,
      fecha_pago: data.fecha_pago,
      monto_total: totalMonto,
      numero_operacion: data.numero_operacion,
      meses_pagados: ["10"],
      observacion: data.observacion,
      id_colegiado: colegiado as Colegiado,
      id_metodo_pago: metodoPago,
      tarifas: ids
    };
    console.log(pago)
    const res = await createPago(pago);
    console.log(res)
    try {
      const res = await createPago(pago);
      console.log(res)
      toast.success('Pago registrado exitosamente');
      navigate("/admin/pagos")
    } catch (error) {
      toast.error("Error al registrar el pago");
    } finally {
      setIsLoading(false)
    }
  }

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#ECF6E8',
      borderRadius: '0.50rem',
      border: 'none',
      boxShadow: state.isFocused ? '0 0 0 2px #A3BFA1' : 'none',
      padding: '2px 8px',
      '&:hover': {
        borderColor: 'none',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#D8E9D3' : '#ECF6E8',
      color: '#3A3A3A',
      padding: 10,
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.50rem',
      backgroundColor: '#ECF6E8',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#3A3A3A',
    }),
  };

  type CustomColumnDef<T> = ColumnDef<T> & {
    isMoney?: boolean;
  };

  const columns: CustomColumnDef<Tarifa>[] = [
    {
      header: 'Denominación',
      accessorKey: 'nombre_tarifa',
      cell: info => info.getValue()
    },
    {
      header: 'Monto S/.',
      accessorKey: 'precio_tarifa',
      isMoney: true,
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? `S/. ${value.toFixed(2)}` : value;
      }
    }
  ];

  const handleSelectChange = (
    newValue: MultiValue<Option>,
  ) => {
    const selectedTarifas = newValue.map(option => option.value);
    setSelectedTarifaList(selectedTarifas);
  };

  return (
    <>
      <div className="flex flex-col space-y-5 my-5">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <div className="flex flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 p-2"
            >
              <FaArrowCircleLeft className="mr-2" size={"30px"} />
            </button>
            <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Nuevo pago</h4>
          </div>
        </div>
        <form className="flex flex-col space-y-5 my-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col w-full lg:w-2/4">
              <BuscarColegiadoPagos
                onColegiadoFound={(foundColegiado) => setColegiado(foundColegiado)}
              />
              <div className="text-default-green px-5 py-2">
                <div className="flex flex-row w-full space-x-10">
                  <div className="w-1/2 space-y-2">
                    <label htmlFor="numero_operacion" className="w-full text-xl font-nunito font-extrabold block my-auto">Numero de operación:</label>
                    <input
                      type="number"
                      className="w-full bg-custom-light-turquoise focus:outline-none shadow-custom-input rounded-lg py-2 px-3"
                      placeholder="0000"
                      min={0}
                      {...register("numero_operacion")}
                    />
                  </div>
                  <div className="w-1/2 space-y-2">
                    <label htmlFor="fecha_pago" className="w-full text-xl font-nunito font-extrabold block my-auto">Fecha de pago:</label>
                    <input
                      type="date"
                      className="w-full bg-custom-light-turquoise rounded-lg focus:outline-none shadow-custom-input focus:shadow-custom-input py-2 px-3"
                      {...register("fecha_pago", { required: "Este campo es obligatorio." })}
                    />
                    {
                      errors.fecha_pago && <ErrorSpan mensaje={errors.fecha_pago.message} />
                    }
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-[#00330A] space-y-2 mb-5 px-5 py-4">
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
                      sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                    />} label={<span className="text-default-green font-semibold">Efectivo</span>} />

                    <FormControlLabel className="w-1/5" value="deposito" control={<Radio
                      sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                    />} label={<span className="text-default-green font-semibold">Depósito</span>} />

                    <FormControlLabel className="w-1/5" value="yape" control={<Radio
                      sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                    />} label={<span className="text-default-green font-semibold">Yape</span>} />

                    <FormControlLabel className="w-1/5" value="plin" control={<Radio
                      sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                    />} label={<span className="text-default-green font-semibold">Plin</span>} />

                  </RadioGroup>
                </div>
              </div>

              <div className="flex flex-col w-full bg-dark-light-turquoise text-default-green rounded-2xl space-y-2 p-5">
                <label htmlFor="observacion" className="w-full text-xl font-nunito font-extrabold block">Observación:</label>
                <textarea
                  rows={4}
                  className="bg-[#ECF6E8] border-solid border border-black resize-none focus:outline-none rounded-lg p-2"
                  {...register("observacion")}
                />
              </div>
            </div>
            <div className="flex flex-col w-2/4 bg-dark-light-turquoise rounded-lg p-5">
              <div className="flex frex-row justify-between space-x-5">
                <AsyncSelect<Option, true>
                  className="mb-5 w-full"
                  components={animatedComponents}
                  styles={customStyles}
                  placeholder="Seleccionar importes..."
                  isMulti
                  defaultOptions
                  loadOptions={cargarTarifas}
                  onChange={handleSelectChange}
                />
              </div>
              <SimpleTable<Tarifa>
                columns={columns}
                data={selectedTarifaList}
              />
              <div className="flex flex-row justify-between text-md text-default font-nunito font-bold bg-custom-light-turquoise rounded-lg mt-5 p-5">
                <span>Total:</span>
                <span>S/. {totalMonto.toFixed(2)}</span>
              </div>

            </div>
          </div>
          <div className="flex flex-row justify-end text-md font-nunito font-bold space-x-5 mt-5 me-5">
            <button type="submit" className="w-2/6 bg-[#007336] text-white hover:bg-[#00330A] shadow-md rounded-lg transition duration-300 space-x-4 px-8 py-2">Guardar pago</button>
            <Link to={"/admin/pagos"} className="w-1/6">
              <button type="button" className="w-full border-solid border-2 border-[#3A3A3A] hover:bg-default-gray hover:text-white transition duration-300 rounded-lg py-3">
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false} />
    </>
  )
}

