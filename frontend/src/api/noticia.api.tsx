import axios from "axios";

export const getAllNoticias = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/list-publicacion/`)
}

export const getAllNoticiasByPage = (page = 0, pageSize = 5) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/list-publicacion/?page=${page + 1}&page_size=${pageSize}`)
}

export const getNoticiasById = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/list-publicacion/${params}`)
}

export const getNoticiasByFilter = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/list-publicacion/${params}`)
}
