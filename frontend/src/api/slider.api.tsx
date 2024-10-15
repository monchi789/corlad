import axios from "axios";
import Cookies from 'js-cookie';
import { Slider } from "../interfaces/model/Slider";

// Para el panel de administrador
export const getAllSliders = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(apiUrl + 'slider/sliders/', {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const createSlider = (data: Slider) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.post(apiUrl + 'slider/sliders/', data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const editSlider = (id: number, data: Slider) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(apiUrl + `slider/sliders/${id}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const deleteSlider = (id: number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.delete(apiUrl + `slider/sliders/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

// Para la parte pública
export const getSlider = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl + 'slider/list-sliders/');
}