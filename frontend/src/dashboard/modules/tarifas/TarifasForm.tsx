import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { createTarifa, updateTarifa } from '../../../api/tarifa.api';
import { Tarifa } from '../../../interfaces/model/Tarifa';
import ErrorSpan from '../../components/ui/ErrorSpan';
import Spinner from '../../components/ui/Spinner';

interface FormData {
  nombre_tarifa: string;
  descripcion_tarifa: string;
  monto_pago_entero: number | null;
  monto_pago_decimal: number;
}

interface TarifaFormProps {
  onTarifaAdded: (success: boolean) => void;
  tarifa?: Tarifa;
  resetTarifa: () => void; 
}

export const TarifasForm = ({ onTarifaAdded, tarifa, resetTarifa  }: TarifaFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

  // Efecto para cargar datos en los inputs cuando se edita una tarifa
  useEffect(() => {
    if (tarifa) {
      setValue("nombre_tarifa", tarifa.nombre_tarifa);
      setValue("descripcion_tarifa", tarifa.descripcion_tarifa);
      const [entero, decimal] = tarifa.precio_tarifa?.toString().split('.');
      setValue("monto_pago_entero", entero ? parseInt(entero) : null);
      setValue("monto_pago_decimal", parseInt(decimal) || 0);
    }
  }, [tarifa, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const precio_tarifa = parseFloat(`${data.monto_pago_entero}.${data.monto_pago_decimal.toString().padStart(1, '0')}`);
    const nuevaTarifa: Tarifa = {
      id: tarifa?.id || 0,  // Si hay un id, se usa para edición; si no, es creación
      nombre_tarifa: data.nombre_tarifa,
      descripcion_tarifa: data.descripcion_tarifa,
      precio_tarifa,
      es_mensualidad: false
    };

    try {
      if (tarifa?.id) {
        await updateTarifa(tarifa?.id as number, nuevaTarifa);
      } else {
        await createTarifa(nuevaTarifa);
      }
      onTarifaAdded(true);
      reset(); // Limpiar el formulario después de guardar
      resetTarifa(); // También reseteamos la tarifa al estado inicial
    } catch (error) {
      onTarifaAdded(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para limpiar los campos del formulario
  const cleanForm = () => {
    reset({
      nombre_tarifa: "",
      descripcion_tarifa: "",
      monto_pago_entero: null,
      monto_pago_decimal: 0,
    });
    resetTarifa(); // También reseteamos la tarifa al estado inicial
  };

  return (
    <form className="flex flex-col w-full lg:w-1/3 space-y-10 p-5" onSubmit={handleSubmit(onSubmit)}>
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
              message: "Este campo debe tener al menos 2 caracteres"
            }
          })}
        />
        {errors.nombre_tarifa && <ErrorSpan mensaje={errors.nombre_tarifa.message} />}
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
                message: "El monto decimal no puede ser menor que 0"
              },
              max: {
                value: 99,
                message: "El monto decimal no puede ser mayor que 99"
              }
            })}
          />
        </div>
        {errors.monto_pago_entero && <ErrorSpan mensaje={errors.monto_pago_entero.message} />}
        {errors.monto_pago_decimal && <ErrorSpan mensaje={errors.monto_pago_decimal.message} />}
      </div>

      <div className="flex flex-row space-x-5 mx-auto">
        <button
          className={
            `flex flex-row bg-corlad text-white font-nunito font-semibold hover:bg-[#00330A] rounded-lg transition duration-300 space-x-2 mx-auto px-4 py-1
            ${isLoading ? 'opacity-50' : 'hover:bg-hover-corlad transition duration-300'}`
          }
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : <span className="my-auto">Guardar tarifa</span>}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 px-4 py-2"
          onClick={cleanForm}
        >
          Limpiar campos
        </button>
      </div>
    </form>
  )
}

export default TarifasForm;
