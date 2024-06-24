import axios from "axios";

export const getAllNoticias = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'http://127.0.0.1:8000/gestion-publicaciones/publicaciones/')
}
