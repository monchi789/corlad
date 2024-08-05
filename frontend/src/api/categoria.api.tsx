import axios from "axios"
import Cookies from 'js-cookie';

export const getAllCategoriasAdmin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-publicaciones/categorias/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

// Para la parte pública
export const getAllCategorias = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-publicaciones/list-categoria/`)
}