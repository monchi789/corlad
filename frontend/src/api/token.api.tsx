import axios from "axios"

export const getTokenAuth = async (username:string, password:string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  try {
    const response = await axios.post(`${apiUrl}api/token/`, {
      username: username,
      password: password
    });

    const token = response.data.token;
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
    return token;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    throw error; // Lanza el error para manejarlo en la llamada a esta función
  }
};
