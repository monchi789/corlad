import axios from "axios";
import Cookies from 'js-cookie';

// Para el panel de administración
export const getAllPublicaciones = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-publicaciones/publicaciones/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}


// Para la parte pública
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
