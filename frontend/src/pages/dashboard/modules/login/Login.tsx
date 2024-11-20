import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdLock } from "react-icons/md";
import axios from "axios";
import logo_corlad from '../../../../assets/web/corlad_logo.png';
import bgImage from '../../../../assets/web/machupicchu.webp';

export function getDecodedToken(token: string) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}api/token/`, { username, password });
      const token = response.data.access;
      login(token);
      navigate('/admin');
    } catch (error) {
      setError('Las credenciales ingresadas son incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)'
        }}
      />

      <div className="w-full max-w-3xl relative z-10">
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  ¡Bienvenido!
                </h2>
                <p className="text-gray-600">
                  Inicie sesión con los datos que ingresó durante el registro
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-corlad focus:border-transparent transition-all duration-200 bg-gray-50 pl-10 pr-3 py-3"
                    placeholder="Usuario"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full outline-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-corlad focus:border-transparent transition-all duration-200 bg-gray-50 pl-10 pr-10 py-3"
                    placeholder="Contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-corlad hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ingresando...
                    </span>
                  ) : (
                    'Ingresar'
                  )}
                </button>
              </form>
            </div>

            <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center items-center">
              <img
                src={logo_corlad}
                alt="CORLAD Logo"
                className="w-64 h-64 object-contain mb-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
