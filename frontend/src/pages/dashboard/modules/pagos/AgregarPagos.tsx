import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Colegiado } from "../../../../interfaces/model/Colegiado";
import { MetodoPago, Pago } from "../../../../interfaces/model/Pago";
import { createPago, getMetodoPagoByFilter } from "../../../../api/pagos.api";
import toast, { Toaster } from "react-hot-toast";
import { Tarifa } from "../../../../interfaces/model/Tarifa";
import { getAllTarifas } from "../../../../api/tarifa.api";
import AsyncSelect from "react-select/async"
import makeAnimated from 'react-select/animated';
import SimpleTable from "../../components/ui/SimpleTable";
import { ColumnDef } from "@tanstack/react-table";
import { MultiValue } from 'react-select';
import { FaArrowCircleLeft } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form"
import BuscarColegiadoPagos from "./BuscarColegiadoPagos";
import { Checkbox } from "@mui/material";
import Spinner from "../../components/ui/Spinner";

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
  numero_recibo: string;
}

export default function AgregarPagos() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>()

  const [colegiado, setColegiado] = useState<Colegiado | null>(null);
  const [allTarifasList, setAllTarifaList] = useState<Tarifa[]>([]);
  const [selectedTarifaList, setSelectedTarifaList] = useState<Tarifa[]>([]);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState('');

  const [isMensualidad, setIsMensualidad] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Obtener el mes actual (0-11) y calcular el mes posterior (1-12)
    const currentMonth = new Date().getMonth(); // Devuelve 0 para enero, 11 para diciembre
    const nextMonth = (currentMonth + 1) % 12; // Obtiene el mes posterior (0-11)

    // Actualiza el estado para seleccionar el mes posterior como default checked
    setSelectedMonths([months[nextMonth].value]);
  }, []);

  // Calcular el monto total
  const totalMonto = selectedTarifaList.reduce((acc, tarifa) => acc + Number(tarifa.precio_tarifa), 0);

  const cargarTarifas = async () => {
    try {
      const res = await getAllTarifas();
      const tarifas: Tarifa[] = res.data;
      setAllTarifaList(tarifas)

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

    const tarifasIdList = selectedTarifaList.map((tarifa) => tarifa.id);

    if (isMensualidad) {
      const pago: Pago = {
        id: 0,
        numero_operacion: data.numero_operacion,
        observacion: data.observacion,
        fecha_pago: data.fecha_pago,
        numero_recibo: data.numero_recibo,
        id_colegiado: colegiado as Colegiado,
        id_metodo_pago: metodoPago,
        tarifas: tarifasIdList,
        meses_pagados: selectedMonths
      };
      try {
        await createPago(pago);
        toast.success('Pago registrado exitosamente');
        navigate("/admin/pagos")
      } catch (error) {
        toast.error("Error al registrar el pago");
      } finally {
        setIsLoading(false)
      }
    } else {
      const pago: Pago = {
        id: 0,
        numero_operacion: data.numero_operacion,
        observacion: data.observacion,
        fecha_pago: data.fecha_pago,
        numero_recibo: data.numero_recibo,
        id_colegiado: colegiado as Colegiado,
        id_metodo_pago: metodoPago,
        tarifas: tarifasIdList
      };
      try {
        await createPago(pago);
        toast.success('Pago registrado exitosamente');
        navigate("/admin/pagos")
      } catch (error) {
        toast.error("Error al registrar el pago");
      } finally {
        setIsLoading(false)
      }
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
    setSelectedTarifaList(prevList => {
      const mensualidadTarifa = prevList.find(t => t.nombre_tarifa.startsWith('Mensualidad ('));
      return mensualidadTarifa ? [...selectedTarifas, mensualidadTarifa] : selectedTarifas;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMensualidad(event.target.checked); // Actualiza el estado con el valor del checkbox
  };

  const handleChangeMeses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Agrega o elimina el mes de la lista de meses seleccionados
    setSelectedMonths((prev) => {
      if (prev.includes(value)) {
        return prev.filter((month) => month !== value); // Eliminar el mes
      } else {
        return [...prev, value]; // Agregar el mes
      }
    });
  };

  useEffect(() => {
    if (isMensualidad) {
      const tarifaMensualidad = allTarifasList.find(tarifa => tarifa.nombre_tarifa === 'Mensualidad');
      if (tarifaMensualidad) {
        const cantidadMeses = selectedMonths.length;
        const nuevaTarifa = {
          ...tarifaMensualidad,
          nombre_tarifa: `Mensualidad (${cantidadMeses} ${cantidadMeses === 1 ? 'mes' : 'meses'})`,
          precio_tarifa: Number(tarifaMensualidad.precio_tarifa) * cantidadMeses
        };

        setSelectedTarifaList(prevList => {
          const filteredList = prevList.filter(t => t.nombre_tarifa !== 'Mensualidad' && !t.nombre_tarifa.startsWith('Mensualidad ('));
          return cantidadMeses > 0 ? [...filteredList, nuevaTarifa] : filteredList;
        });
      }
    } else {
      setSelectedTarifaList(prevList => prevList.filter(t => t.nombre_tarifa !== 'Mensualidad' && !t.nombre_tarifa.startsWith('Mensualidad (')));
    }
  }, [isMensualidad, selectedMonths, allTarifasList]);
  // Agrega selectedMonths y allTarifasList como dependencias

  // Array de meses con sus nombres y valores correspondientes
  const months = [
    { label: 'Enero', value: '01' },
    { label: 'Febrero', value: '02' },
    { label: 'Marzo', value: '03' },
    { label: 'Abril', value: '04' },
    { label: 'Mayo', value: '05' },
    { label: 'Junio', value: '06' },
    { label: 'Julio', value: '07' },
    { label: 'Agosto', value: '08' },
    { label: 'Septiembre', value: '09' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

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
              <div className="flex flex-row justify-start space-x-10 mb-3 px-5">
                <span className="font-nunito font-bold my-auto"> ¿Pago de mensualidad de un colegiado?</span>
                <Checkbox
                  checked={isMensualidad}
                  onChange={handleChange}
                  sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                />
              </div>
              <BuscarColegiadoPagos
                onColegiadoFound={(foundColegiado) => setColegiado(foundColegiado)}
              />
              <div className="text-default-green px-5 py-2">
                <div className="flex flex-row w-full space-x-10">
                  <div className="w-full space-y-2">
                    <label htmlFor="numero_operacion" className="w-full text-xl font-nunito font-extrabold block my-auto">Numero de operación:</label>
                    <input
                      type="number"
                      className="w-full bg-custom-light-turquoise focus:outline-none shadow-custom-input rounded-lg py-2 px-3"
                      placeholder="0000"
                      min={0}
                      {...register("numero_operacion")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-[#00330A] space-y-2 px-5 py-4">
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

              {isMensualidad && (
                <div className="flex flex-col text-[#00330A] space-y-2 mb-5 px-5 py-4">
                  <span className="text-xl font-nunito font-extrabold">Meses pagados:</span>
                  <div className="flex flex-wrap w-full justify-between">
                    {months.map(({ label, value }) => (
                      <FormControlLabel
                        key={value}
                        control={
                          <Checkbox
                            value={value}
                            checked={selectedMonths.includes(value)}
                            onChange={handleChangeMeses}
                            sx={{ color: '#00330A', '&.Mui-checked': { color: '#00330A' } }}
                          />
                        }
                        label={<span className="text-default-green font-semibold">{label}</span>}
                      />
                    ))}
                  </div>
                </div>
              )}

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
                  value={selectedTarifaList.filter(t => !t.nombre_tarifa.startsWith('Mensualidad (')).map(t => ({ value: t, label: `${t.nombre_tarifa} - S/.${t.precio_tarifa}` }))}
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
            <button
              type="submit"
              className={
                `w-2/6 bg-corlad text-white shadow-md rounded-lg space-x-4 px-8 py-2
            ${isLoading ? 'opacity-50' : 'hover:bg-hover-corlad transition duration-300'}`
              }
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Guardar pago'}
            </button>
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

