import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './pages/dashboard/contexts/AuthContext';
import { DropdownProvider } from './pages/dashboard/contexts/DropdownContext';
import WhatsAppButton from './pages/public/components/WhatsAppButton';

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
      <AuthProvider>
        <DropdownProvider>
          <AppRoutes />
        </DropdownProvider>
      </AuthProvider>
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App;
