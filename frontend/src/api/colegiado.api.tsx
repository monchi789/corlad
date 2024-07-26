import axios from "axios";
import Cookies from 'js-cookie';
import { Colegiado } from "../interfaces/model/Colegiado";

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-colegiados/colegiados/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const createColegiado = async (formData: FormData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies
  
  return axios.post(`${apiUrl}gestion-colegiados/colegiados/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};

// Para la parte pública
export const getColegiadoByFilters = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/consultar-habilidad/${params}`)
}

