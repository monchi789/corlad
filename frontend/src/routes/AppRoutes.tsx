// routes/AppRoutes.tsx
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GroupProtectedRoute } from './GroupProtectedRoute.tsx';
import { Unauthorized } from '../dashboard/shared/NoAutorizado.tsx';

// Rutas públicas con Lazy Loading
const Inicio = lazy(() => import('../web/modules/inicio/Inicio.tsx'));
const Nosotros = lazy(() => import('../web/modules/nosotros/Nosotros.tsx'));
const Noticias = lazy(() => import('../web/modules/noticias/Noticias.tsx'));
const Contactanos = lazy(() => import('../web/modules/contactanos/Contactanos.tsx'));
const ConsultarHabilidad = lazy(() => import('../web/modules/colegiados/ConsultarHabilidad.tsx'));
const Noticia = lazy(() => import('../web/modules/noticias/noticia/Noticia.tsx'));
const Colegiatura = lazy(() => import('../web/modules/colegiarse/colegiatura.tsx'));
const MisionVision = lazy(() => import('../web/modules/mision-vision/misionVision.tsx'));

// Rutas protegidas con Lazy Loading
const InicioAdmin = lazy(() => import('../dashboard/modules/inicio/InicioAdmin.tsx'));
const ColegiadosAdmin = lazy(() => import('../dashboard/modules/colegiados/ColegiadosAdmin.tsx'));
const AgregarColegiado = lazy(() => import('../dashboard/modules/colegiados/AgregarColegiado.tsx'));
const Login = lazy(() => import('../dashboard/modules/login/Login.tsx'));
const Escuelas = lazy(() => import('../dashboard/modules/escuelas/Escuelas.tsx'));
const PopUpsAdmin = lazy(() => import('../dashboard/modules/popups/PopUpsAdmin.tsx'));
const SlidersAdmin = lazy(() => import('../dashboard/modules/sliders/SlidersAdmin.tsx'));
const PublicacionesAdmin = lazy(() => import('../dashboard/modules/publicaciones/PublicacionesAdmin.tsx'));
const CategoriasAdmin = lazy(() => import('../dashboard/modules/publicaciones/CategoriasAdmin.tsx'));
const EstadoCuentas = lazy(() => import('../dashboard/modules/estadocuenta/EstadoCuentas.tsx'));
const Pagos = lazy(() => import('../dashboard/modules/pagos/Pagos.tsx'));
const EditarColegiado = lazy(() => import('../dashboard/modules/colegiados/EditarColegiado.tsx'));
const AgregarPagos = lazy(() => import('../dashboard/modules/pagos/AgregarPagos.tsx'));
const EditarPagos = lazy(() => import('../dashboard/modules/pagos/EditarPagos.tsx'));
const NuevaPublicacion = lazy(() => import('../dashboard/modules/publicaciones/NuevaPublicacion.tsx'));
const EditarPublicacion = lazy(() => import('../dashboard/modules/publicaciones/EditarPublicacion.tsx'));

// Componente de carga personalizada
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div 
      className="inline-block w-8 h-8 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"
      role="status"
    >
    </div>
  </div>
);

const publicRoutes = [
  { path: "/", element: <Inicio /> },
  { path: "/nosotros", element: <Nosotros /> },
  { path: "/noticias", element: <Noticias /> },
  { path: "/noticias/:id/:titulo", element: <Noticia /> },
  { path: "/contactanos", element: <Contactanos /> },
  { path: "/consultar-habilidad", element: <ConsultarHabilidad /> },
  { path: "/colegiatura",  element: <Colegiatura/> },
  { path: "/mision-vision", element: <MisionVision/>}
];

const adminRoutes = [
  { path: "/admin", element: <InicioAdmin />, allowedGroups: ['admin', 'secretaria', 'publicador'] },

  // Permisos para secretaria
  { path: "/admin/colegiado", element: <ColegiadosAdmin />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/nuevo-colegiado", element: <AgregarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/editar-colegiado/:id1/:id2", element: <EditarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/capitulos", element: <Escuelas />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos", element: <Pagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/nuevo-pago", element: <AgregarPagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/editar-pago/:id", element: <EditarPagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/estado-cuenta", element: <EstadoCuentas />, allowedGroups: ['admin', 'secretaria'] },
  
  // Permisos para publicador
  { path: "/admin/publicaciones", element: <PublicacionesAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/nueva-publicacion", element: <NuevaPublicacion />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/editar-publicacion/:id", element: <EditarPublicacion />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/categorias", element: <CategoriasAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/anuncios", element: <PopUpsAdmin />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/galeria", element: <SlidersAdmin />, allowedGroups: ['admin', 'publicador'] },
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
};

export default AppRoutes;
