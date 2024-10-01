import axios from "axios";
import Cookies from 'js-cookie';
import { Tarifa } from "../interfaces/model/Tarifa";

export const getAllTarifas = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  const res = await axios.get(`${apiUrl}tarifa/tarifas/`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });

  return res;
};



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