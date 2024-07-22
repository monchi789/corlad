import { BrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'primereact/resources/primereact.min.css';
import { useEffect } from 'react';
import { AuthProvider } from './dashboard/contexts/AuthContext';

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
