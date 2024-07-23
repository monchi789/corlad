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
import { GroupProtectedRoute } from './GroupProtectedRoute.tsx';
import { Unauthorized } from '../dashboard/shared/NoAutorizado.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/noticias/:id/:titulo" element={<Noticia />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/consultar-habilidad" element={<ConsultarHabilidad />} />

      {/* Ruta de login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route path="/admin" element={
        <GroupProtectedRoute allowedGroups={['publicador', 'secretaria']}>
          <InicioAdmin />
        </GroupProtectedRoute>
      } />

      {/* Rutas protegidas para la secretaria */}
      <Route path="/admin/colegiado" element={
        <GroupProtectedRoute allowedGroups={['secretaria']}>
          <ColegiadosAdmin />
        </GroupProtectedRoute>
      } />

      <Route path="/admin/colegiado/agregar-colegiado" element={
        <GroupProtectedRoute allowedGroups={['secretaria']}>
          <AgregarColegiado />
        </GroupProtectedRoute>
      } />

      <Route path="/admin/escuelas" element={
        <GroupProtectedRoute allowedGroups={['secretaria']}>
          <Escuelas />
        </GroupProtectedRoute>
      } />

      {/* Rutas protegidas para el publicador */}

      <Route path="/admin/publicaciones" element={
        <GroupProtectedRoute allowedGroups={['publicador']}>
          <PublicacionesAdmin />
        </GroupProtectedRoute>
      } />
      <Route path="/admin/anuncios" element={
        <GroupProtectedRoute allowedGroups={['publicador']}>
          <PopUpsAdmin />
        </GroupProtectedRoute>
      } />
      <Route path="/admin/galeria" element={
        <GroupProtectedRoute allowedGroups={['publicador']}>
          <SlidersAdmin />
        </GroupProtectedRoute>
      } />

      {/* Ruta para usuarios no autorizados */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
