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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColegiadoByFilters = (params: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/consultar-habilidad/${params}`)
}

// New function to get the list of schools
export const getAllEscuelas = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken'); // Obteniendo el token del localStorage

  return axios.get(`${apiUrl}gestion-colegiados/escuelas/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

// Function to get the list of specialties
export const getAllEspecialidades = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken'); // Obteniendo el token del localStorage

  return axios.get(`${apiUrl}gestion-colegiados/especialidades/`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}
