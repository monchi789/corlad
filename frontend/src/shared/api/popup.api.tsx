import axios from "axios";

export const getPopUp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'gestion-contenidos/pop-ups/')
}
