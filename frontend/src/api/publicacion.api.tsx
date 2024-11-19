import axios from "axios";
import Cookies from 'js-cookie';

// Para el panel de administración
export const getAllPublicaciones = (page=0, pageSize=5) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}publicacion/publicaciones/?page=${page + 1}&page_size=${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getPublicacionesById = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}publicacion/publicaciones/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const createPublicacion = (formData: FormData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}publicacion/publicaciones/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const editPublicacion = (id: number, formData: FormData) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}publicacion/publicaciones/${id}/`, formData, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const deletePublicacion = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(`${apiUrl}publicacion/publicaciones/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

// Para la parte pública
export const getAllNoticiasByPage = (page = 0, pageSize = 5) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}publicacion/list-publicacion/?page=${page + 1}&page_size=${pageSize}`)
}

export const getNoticiasById = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}publicacion/list-publicacion/${params}/`)
}

export const getNoticiasByFilter = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}publicacion/list-publicacion/${params}/`)
}

export const getBolsaTrabajo = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}publicacion/bolsa-trabajos/`)
}
