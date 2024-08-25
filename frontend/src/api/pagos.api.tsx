import axios from "axios";
import Cookies from 'js-cookie';
import { Pago } from "../interfaces/model/Pago";

export const getTipoPagoByFilter = (nombre_tipo_pago?: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-pagos/tipo-pagos/`, {
    params: {
      nombre_tipo_pago
    },
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getMetodoPagoByFilter = (nombre_metodo_pago?: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies
  
  return axios.get(`${apiUrl}gestion-pagos/metodo-pagos/`, {
    params: {
      nombre_metodo_pago
    },
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getAllPagos = (page = 0, pageSize = 10) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-pagos/pagos/?page=${page + 1}&page_size=${pageSize}`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getPagoById = (id:number) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-pagos/pagos/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const getPagoByFilters = (numero_colegiatura?: string, dni_colegiado?: string, apellido_paterno?: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.get(`${apiUrl}gestion-pagos/pagos/`, {
    params: {
      numero_colegiatura,
      dni_colegiado,
      apellido_paterno
    },
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};

export const createPago = (pago: Pago) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies
  
  return axios.post(`${apiUrl}gestion-pagos/pagos/`, pago, {
    headers: {
      'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
    }
  });
}

export const updatePago = async (id: number, data: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('authToken'); // Obteniendo el token de las cookies

  return axios.put(`${apiUrl}gestion-pagos/pagos/${id}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}`, // Incluyendo el token en los encabezados
    },
  });
};