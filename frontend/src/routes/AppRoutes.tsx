import { Navigate, Route, Routes } from 'react-router-dom';
import { Inicio } from '../modules/inicio/Inicio';
import { Nosotros } from '../modules/nosotros/Nosotros';
import { Noticias } from '../modules/noticias/Noticias';
import { Contactanos } from '../modules/contactanos/Contactanos';
import { ConsultarColegiado } from '../modules/colegiados/ConsultarColegiado';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/inicio'} />} />
      <Route path='/inicio' element={<Inicio />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/consultar-habilidad" element={<ConsultarColegiado/>}/>
    </Routes>
  );
};

export default AppRoutes;
