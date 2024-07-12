import axios from "axios";

export const getSlider = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.get(apiUrl+'gestion-contenidos/sliders/')
}
