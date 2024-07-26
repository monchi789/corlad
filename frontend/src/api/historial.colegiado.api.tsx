import axios from "axios";
import Cookies from 'js-cookie';
import { HistorialColegiado } from "../interfaces/model/HistorialColegiado";

export const createHistorialColegiado = (historialColegiadoData: HistorialColegiado) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}gestion-colegiados/historial-educativo/`, historialColegiadoData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}