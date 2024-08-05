import axios from "axios";
import Cookies from 'js-cookie';
import { Categoria} from '../interfaces/model/Categoria';

const apiUrl = import.meta.env.VITE_API_URL;
const token = Cookies.get('authToken');

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
  return axios.get<Categoria[]>(`${apiUrl}gestion-publicaciones/categorias/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

export const createCategoria = (newCategoriaData: Omit<Categoria, 'id'>) => {
  return axios.post<Categoria>(`${apiUrl}gestion-publicaciones/categorias/`, newCategoriaData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export const updateCategoria = (id: number, updatedData: Partial<Categoria>) => {
  return axios.put<Categoria>(`${apiUrl}gestion-publicaciones/categorias/${id}/`, updatedData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteCategoria = (id: number) => {
  return axios.delete<void>(`${apiUrl}gestion-publicaciones/categorias/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
