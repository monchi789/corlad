import { BrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'primereact/resources/primereact.min.css';
import { useEffect } from 'react';

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
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
