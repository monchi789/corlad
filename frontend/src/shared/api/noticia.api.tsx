import axios from "axios";

export const getAllNoticias = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/publicaciones/`)
}

export const getNoticiasById = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/publicaciones/${params}`)
}

export const getNoticiasByFilter = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/publicaciones/${params}`)
}
