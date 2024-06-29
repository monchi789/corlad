import axios from "axios";

export const getAllSliders = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'gestion-publicaciones/publicaciones/')
}
