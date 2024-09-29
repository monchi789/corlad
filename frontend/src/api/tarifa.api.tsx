import axios from "axios";
import Cookies from 'js-cookie';

export const getAllTarifas = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}tarifa/tarifas/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}