import axios from "axios"
import { ContactoData } from "../interfaces/Contacto";

export const sendEmail = (formContactUs: ContactoData ) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return axios.post(`${apiUrl}enviar-email/`, formContactUs)
}
