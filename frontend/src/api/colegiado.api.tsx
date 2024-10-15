import axios from "axios";
import Cookies from 'js-cookie';
import { Colegiado } from "../interfaces/model/Colegiado";

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}colegiado/colegiados/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getColegiadoById = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}colegiado/colegiados/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getColegiadoByFilters = (numero_colegiatura?: string, dni_colegiado?: string, apellido_paterno?: string, estado?: boolean) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}colegiado/colegiados/`, {
    params: {
      numero_colegiatura,
      dni_colegiado,
      apellido_paterno,
      estado
    },
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};

export const createColegiado = async (formData: FormData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}colegiado/colegiados/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};

export const updateColegiado = async (id: number, formData: Colegiado) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}colegiado/colegiados/${id}/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};

export const deleteColegiadoById = async (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(`${apiUrl}colegiado/colegiados/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};

// Para la parte pública
export const getConsultarHabilidad = (params: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return axios.get(`${apiUrl}historial-educativo/consultar-habilidad/${params}`)
}

