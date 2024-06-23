import axios from "axios";

export const getAllNoticias = () => {
  return axios.get('http://127.0.0.1:8000/gestion-publicaciones/publicaciones/')
}
