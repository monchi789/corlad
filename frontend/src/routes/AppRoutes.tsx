import { Route, Routes } from 'react-router-dom';
import { Inicio } from '../web/modules/inicio/Inicio.tsx';
import { Nosotros } from '../web/modules/nosotros/Nosotros.tsx';
import { Noticias } from '../web/modules/noticias/Noticias.tsx';
import { Contactanos } from '../web/modules/contactanos/Contactanos.tsx';
import { ConsultarHabilidad } from '../web/modules/colegiados/ConsultarHabilidad.tsx';
import { Noticia } from '../web/modules/noticias/noticia/Noticia.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/nosotros" element={<Nosotros/>} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:id/:titulo" element={<Noticia />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/consultar-habilidad" element={<ConsultarHabilidad/>}/>
    </Routes>
  );
};

export default AppRoutes;
