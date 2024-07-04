import axios from "axios"

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/colegiados/`)
}

export const getColegiadoByApellidoNombre = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/colegiados/${id}`)
}

export const getColegiadoByDni = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/colegiados/${id}`)
}

export const getColegiadoByColegiatura = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/colegiados/${id}`)
}
