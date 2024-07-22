import axios from "axios";

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken'); // Obteniendo el token del localStorage

  return axios.get(`${apiUrl}gestion-colegiados/colegiados/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getColegiadoByFilters = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/consultar-habilidad/${params}`)
}
