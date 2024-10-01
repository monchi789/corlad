import axios from "axios";
import Cookies from 'js-cookie';
import { Tarifa } from "../interfaces/model/Tarifa";

export const getAllTarifas = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  try {
    const response = await axios.get(`${apiUrl}tarifa/tarifas/`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
        'Content-Type': 'application/json' // Indicando que el contenido es JSON
      }
    });

    // Para asegurar que los valores numéricos tengan decimales
    const tarifasConDecimales = response.data.results.map((tarifa:any) => ({
      ...tarifa,
      precio_tarifa: tarifa.precio_tarifa.toFixed(2) // Esto garantiza que siempre tenga un decimal
    }));

    return tarifasConDecimales;
  } catch (error) {
    throw error;
  }
}


export const createTarifa = (data: Tarifa) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}tarifa/tarifas/`, data, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });
}