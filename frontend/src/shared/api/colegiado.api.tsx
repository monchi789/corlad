import axios from "axios"

export const getAllColegiados = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'gestion-colegiados/colegiados/')
}
