import axios from "axios"

export const getColegiadoByFilters = (params:any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(`${apiUrl}gestion-colegiados/consultar-habilidad/${params}`)
}

