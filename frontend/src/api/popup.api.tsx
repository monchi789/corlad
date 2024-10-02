import axios from "axios";
import Cookies from 'js-cookie';

export const getPopUps = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}pop-up/pop-ups/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const createPopUps = (data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(`${apiUrl}pop-up/pop-ups/`, data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const updatePopUps = (id: number, data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}pop-up/pop-ups/${id}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const deletePopUps = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(`${apiUrl}pop-up/pop-ups/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

//Para la parte pública
export const getPopUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}pop-up/list-pop-ups/`);
}