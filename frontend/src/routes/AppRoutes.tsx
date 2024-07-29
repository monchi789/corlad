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
import { CategoriasAdmin } from '../dashboard/modules/publicaciones/CategoriasAdmin.tsx';
import { GroupProtectedRoute } from './GroupProtectedRoute.tsx';
import { Unauthorized } from '../dashboard/shared/NoAutorizado.tsx';
import { EstadoCuenta } from '../dashboard/modules/pagos/EstadoCuenta.tsx';
import { Pagos } from '../dashboard/modules/pagos/Pagos.tsx';
import { EditarColegiado } from '../dashboard/modules/colegiados/EditarColegiado.tsx';

const publicRoutes = [
  { path: "/", element: <Inicio /> },
  { path: "/nosotros", element: <Nosotros /> },
  { path: "/noticias", element: <Noticias /> },
  { path: "/noticias/:id/:titulo", element: <Noticia /> },
  { path: "/contactanos", element: <Contactanos /> },
  { path: "/consultar-habilidad", element: <ConsultarHabilidad /> },
];

const adminRoutes = [
  { path: "/admin", element: <InicioAdmin />, allowedGroups: ['admin', 'secretaria', 'publicador'] },

  // Permisos para secretaria
  { path: "/admin/colegiado", element: <ColegiadosAdmin />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/agregar-colegiado", element: <AgregarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/editar-colegiado", element: <EditarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/escuelas", element: <Escuelas />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos", element: <Pagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/estado-cuenta", element: <EstadoCuenta />, allowedGroups: ['admin', 'secretaria'] },
  
  // Permisos para publicador
  { path: "/admin/publicaciones", element: <PublicacionesAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/categorias", element: <CategoriasAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/anuncios", element: <PopUpsAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/galeria", element: <SlidersAdmin />, allowedGroups: ['admin', 'publicador'] },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Ruta de login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Rutas protegidas */}
      {adminRoutes.map(({ path, element, allowedGroups }) => (
        <Route
          key={path}
          path={path}
          element={
            <GroupProtectedRoute allowedGroups={allowedGroups}>
              {element}
            </GroupProtectedRoute>
          }
        />
      ))}

      {/* Ruta para usuarios no autorizados */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
