import axios from "axios";
import Cookies from 'js-cookie';
import { HistorialColegiado } from "../interfaces/model/HistorialColegiado";

export const getAllHistorialColegiado = (page = 0, pageSize = 10) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}historial-educativo/historial-educativo/?page=${page + 1}&page_size=${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}

export const getHistorialColegiadoById = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}historial-educativo/historial-educativo/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}

export const getHistorialColegiadoByFilters = (numero_colegiatura?: string, dni_colegiado?: string, apellido_paterno?: string, estado_colegiado?: boolean) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}historial-educativo/historial-educativo/`, {
    params: {
      numero_colegiatura,
      dni_colegiado,
      apellido_paterno,
      estado_colegiado
    },
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};


export const createHistorialColegiado = (historialColegiadoData: HistorialColegiado) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}historial-educativo/historial-educativo/`, historialColegiadoData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}

export const updateHistorialColegiado = (id:number, historialColegiadoData: HistorialColegiado) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}historial-educativo/historial-educativo/${id}/`, historialColegiadoData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}

export const deleteHistorialColegiadoById = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(`${apiUrl}historial-educativo/historial-educativo/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Asegurando el tipo de contenido
    }
  });
}