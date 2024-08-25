import axios from "axios";
import Cookies from 'js-cookie';

// Para la parte pública
export const getSlider = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl + 'gestion-contenidos/list-sliders/');
}

// Para el panel de administrador
export const getAllSliders = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(apiUrl + 'gestion-contenidos/sliders/', {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const createSlider = (data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(apiUrl + 'gestion-contenidos/sliders/', data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const editSlider = (id: number, data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(apiUrl + `gestion-contenidos/sliders/${id}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const deleteSlider = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(apiUrl + `gestion-contenidos/sliders/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}
