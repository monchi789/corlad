import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useForm, SubmitHandler } from "react-hook-form"

import { createTarifa } from '../../../api/tarifa.api';
import { Tarifa } from '../../../interfaces/model/Tarifa';
import ErrorSpan from '../../components/ui/ErrorSpan';
import Spinner from '../../components/ui/Spinner';

interface FormData {
  nombre_tarifa: string;
  descripcion_tarifa: string;
  monto_pago_entero: number;
  monto_pago_decimal: number;
}

function TarifasForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true)
    const precio_tarifa = parseFloat(`${data.monto_pago_entero}.${data.monto_pago_decimal.toString().padStart(2, '0')}`);
    const tarifa: Tarifa = {
      id: 0,
      nombre_tarifa: data.nombre_tarifa,
      descripcion_tarifa: data.descripcion_tarifa,
      precio_tarifa,
      es_mensualidad: false
    };

    try {
      await createTarifa(tarifa);
    } catch (error) {
      console.error("Error al crear la tarifa:", error);
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <form className="flex flex-col w-1/3 space-y-10 p-5" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-center text-xl font-bold">Crear nueva tarifa</span>
      <div className="flex flex-col">
        <label htmlFor="nombre_tarifa" className="block font-semibold mb-2">Denominación de la tarifa</label>
        <input
          type="text"
          className="w-full bg-[#ECF6E8] rounded-md focus:outline-none shadow-md focus:shadow-custom-input p-2"
          placeholder="Denominar la tarifa como..."
          {...register("nombre_tarifa", {
            required: {
              value: true,
              message: "Este campo es requerido"
            },
            minLength: {
              value: 2,
              message: "Este campo debe tener almenos 2 caracteres"
            }
          })}
        />
        {
          errors.nombre_tarifa && <ErrorSpan mensaje={errors.nombre_tarifa.message} />
        }
      </div>
      <div className="flex flex-col">
        <label htmlFor="descripcion_tarifa" className="block font-semibold mb-2">Descripción</label>
        <textarea
          rows={6}
          className="w-full bg-[#ECF6E8] resize-none focus:outline-none shadow-md focus:shadow-custom-input rounded-md p-2"
          placeholder="Describir la tarifa..."
          {...register("descripcion_tarifa")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="nombre_tarifa" className="block font-semibold mb-2">Monto de la tarifa</label>
        <div className="flex flex-row space-x-3">
          <span className="text-xl my-auto">S/.</span>
          <input
            type="number"
            className="w-full bg-[#ECF6E8] focus:outline-none shadow-md focus:shadow-custom-input rounded-md p-2"
            placeholder="000"
            {...register("monto_pago_entero", {
              required: {
                value: true,
                message: "El monto entero es requerido"
              }
            })}
          />
          <span className="text-xl mt-auto">.</span>
          <input
            type="number"
            className="w-1/2 bg-[#ECF6E8] focus:outline-none shadow-md focus:shadow-custom-input rounded-md p-2"
            placeholder="00"
            defaultValue="00"
            {...register("monto_pago_decimal", {
              min: {
                value: 0,
                message: "El monto decimal no puede ser menos que 0"
              },
              max: {
                value: 99,
                message: "El monto decimal no puede ser mas que 99"
              }
            })}
          />
        </div>
        {
          errors.monto_pago_entero && <ErrorSpan mensaje={errors.monto_pago_entero.message} />
        }
        {
          errors.monto_pago_decimal && <ErrorSpan mensaje={errors.monto_pago_decimal.message} />
        }
      </div>
      <button
        className="flex flex-row bg-corlad text-lg text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black shadow-sm rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-2 mx-auto px-4 py-1"
        type="submit"
      >
        {
          isLoading ? <Spinner /> :
            <>
              <IoMdAddCircleOutline className="my-auto" size={"25px"} /> <span className="my-auto">Agregar tarifa</span>
            </>
        }
      </button>
    </form>
  )
}

export default TarifasForm