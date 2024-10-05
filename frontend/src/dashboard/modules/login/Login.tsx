import { FormEvent, useState } from "react";
import {
  Box, Typography, TextField, IconButton, InputAdornment, Grid,
  Container
} from '@mui/material';
import { FaUser } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import { MdLock } from "react-icons/md";
import logo_corlad from '../../../assets/web/corlad_logo.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../contexts/AuthContext";

// Función para decodificar el token JWT
export function getDecodedToken(token: string) {
  try {

    const decoded = jwtDecode(token); // Usa el tipo genérico aquí

    return decoded;

  } catch (error) {

    return null;

  }
}

// Componente de inicio de sesión
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}api/token/`, { username, password });
      const token = response.data.access;

      // Usa la función login del contexto de autenticación
      // Esta función ahora decodifica el token y almacena la información del usuario
      login(token);

      // Redirige al inicio
      navigate('/admin');
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="w-full h-screen bg-[#ECFFF4] flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto">
        <Container className="bg-white" sx={{ position: 'relative', p: 5, borderRadius: '20px', boxShadow: '0 4px 8px rgba(43, 94, 59, 0.4)' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography component="h1" variant="h5" sx={{ fontFamily: 'Nunito Sans', color: '#00330A' }}>
              Colegio Regional de Licenciados en Administración - Cusco
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography component="h2" variant="h4" sx={{ fontFamily: 'Nunito Sans', color: '#00330A', marginTop: 2, fontWeight: 'bold' }}>
                Bienvenido
              </Typography>
              <Typography component="p" sx={{ fontFamily: 'Nunito Sans', color: 'black', marginBottom: 4 }}>
                Inicie sesión con los datos que ingresó durante el registro
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  variant="outlined"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#94b38f',
                      boxShadow: '0 4px 8px rgba(43, 94, 59, 0.4)',
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                      '&::placeholder': {
                        color: '#2B5E3B',
                        opacity: 1,
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#2B5E3B',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser color="#00330A" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#94b38f',
                      boxShadow: '0 4px 8px rgba(43, 94, 59, 0.4)',
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                      '&::placeholder': {
                        color: '#2B5E3B',
                        opacity: 1,
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#2B5E3B',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLock color="#00330A" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility}>
                          {showPassword ? <AiOutlineEye color="#00330A" /> : <PiEyeClosed color="#00330A" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                  <span className="text-[#B50C0C] mt-2">{error}</span><br />
                  <button className="bg-hover-corlad hover:bg-corlad text-white font-nunito font-bold shadow-md transition duration-200 rounded mt-3 mb-2 px-6 py-1.5" type="submit">
                    Ingresar
                  </button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                }}
                alt="Login"
                src={logo_corlad}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
