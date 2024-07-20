import axios from "axios";

export const getPopUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken'); // Obteniendo el token del localStorage

  return axios.get(`${apiUrl}gestion-contenidos/pop-ups/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getPopUps = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken'); // Obteniendo el token del localStorage

  return axios.get(`${apiUrl}gestion-contenidos/pop-ups/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}
