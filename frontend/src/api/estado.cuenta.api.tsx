import axios from "axios";
import Cookies from 'js-cookie';

export const getAllEstadosCuentas = (page=0, pageSize=10) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}pago/estado-cuenta/?page=${page + 1}&page_size=${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getEstadoCuentaByFilters = (numero_colegiatura?: string, dni_colegiado?: string, apellido_paterno?: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}pago/estado-cuenta/`, {
    params: {
      numero_colegiatura,
      dni_colegiado,
      apellido_paterno
    },
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};