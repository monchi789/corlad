import axios from "axios";
import Cookies from 'js-cookie';
import { Escuela } from '../interfaces/model/Escuela';
import { Especialidad } from '../interfaces/model/Especialidad';

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); 
  return axios.get(`${apiUrl}gestion-colegiados/colegiados/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColegiadoByFilters = (params: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/consultar-habilidad/${params}`)
}

export const getAllEscuelas = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-colegiados/escuelas/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

type NewSchoolData = Omit<Escuela, 'id'>;

export const createEscuela = (newSchoolData: NewSchoolData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}gestion-colegiados/escuelas/`, newSchoolData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });
}

export const updateEscuela = (id: number, updatedData: Partial<Escuela>) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}gestion-colegiados/escuelas/${id}/`, updatedData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });
}

export const deleteEscuela = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); 

  return axios.delete(`${apiUrl}gestion-colegiados/escuelas/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
}

export const getAllEspecialidades = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-colegiados/especialidades/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

type NewSpecialtyData = Omit<Especialidad, 'id'>;

export const createEspecialidad = (newSpecialtyData: NewSpecialtyData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}gestion-colegiados/especialidades/`, newSpecialtyData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });
}

export const updateEspecialidad = (id: number, updatedData: Partial<Especialidad>) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}gestion-colegiados/especialidades/${id}/`, updatedData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
      'Content-Type': 'application/json' // Indicando que el contenido es JSON
    }
  });
}

export const deleteEspecialidad = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken');

  return axios.delete(`${apiUrl}gestion-colegiados/especialidades/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
}
