import axios from "axios";
import Cookies from 'js-cookie';

// Para la parte pública
export const getSlider = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'gestion-contenidos/list-sliders/')
}

// Para el panel de administrador
export const getAllSliders = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(apiUrl+'gestion-contenidos/sliders/', {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}
