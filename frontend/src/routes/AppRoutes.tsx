import { Route, Routes } from 'react-router-dom';
import { Inicio } from '../web/modules/inicio/Inicio.tsx';
import { Nosotros } from '../web/modules/nosotros/Nosotros.tsx';
import { Noticias } from '../web/modules/noticias/Noticias.tsx';
import { Contactanos } from '../web/modules/contactanos/Contactanos.tsx';
import { ConsultarHabilidad } from '../web/modules/colegiados/ConsultarHabilidad.tsx';
import { Noticia } from '../web/modules/noticias/noticia/Noticia.tsx';
import { InicioAdmin } from '../dashboard/modules/inicio/InicioAdmin.tsx';
import { ColegiadosAdmin } from '../dashboard/modules/colegiados/ColegiadosAdmin.tsx';
import { AgregarColegiado } from '../dashboard/modules/colegiados/AgregarColegiado.tsx';
import { Login } from '../dashboard/modules/login/Login.tsx';
import { Escuelas } from '../dashboard/modules/escuelas/Escuelas.tsx';
import { PopUpsAdmin } from '../dashboard/modules/popups/PopUpsAdmin.tsx';
import { SlidersAdmin } from '../dashboard/modules/sliders/SlidersAdmin.tsx';
import { PublicacionesAdmin } from '../dashboard/modules/publicaciones/PublicacionesAdmin.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/nosotros" element={<Nosotros/>} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:id/:titulo" element={<Noticia />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/consultar-habilidad" element={<ConsultarHabilidad/>}/>
      
      <Route path="/admin" element={<InicioAdmin/>}/>
      <Route path="/admin/login" element={<Login />}/>
      <Route path="/admin/colegiado" element={<ColegiadosAdmin/>}/>
      <Route path="/admin/colegiado/agregar-colegiado" element={<AgregarColegiado/>}/>
      <Route path="/admin/escuelas" element={<Escuelas/>}/>
      <Route path="/admin/publicaciones" element={<PublicacionesAdmin />}/>
      <Route path="/admin/anuncios" element={<PopUpsAdmin />}/>
      <Route path="/admin/galeria" element={<SlidersAdmin />}/>

    </Routes>
  );
};

export default AppRoutes;
