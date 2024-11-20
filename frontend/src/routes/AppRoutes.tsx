// routes/AppRoutes.tsx
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GroupProtectedRoute } from './GroupProtectedRoute.tsx';
import AdminLayout from '../pages/dashboard/AdminLayout.tsx';

// Rutas públicas con Lazy Loading
const Inicio = lazy(() => import('../pages/public/modules/inicio/Inicio.tsx'));
const Nosotros = lazy(() => import('../pages/public/modules/institucional/Nosotros.tsx'));
const Normativas = lazy(() => import('../pages/public/modules/institucional/Normativas.tsx'))
const Noticias = lazy(() => import('../pages/public/modules/noticias/Noticias.tsx'));
const Noticia = lazy(() => import('../pages/public/modules/noticias/noticia/Noticia.tsx'));
const BolsaTrabajo = lazy(() => import('../pages/public/modules/noticias/bolsa-trabajo/BolsaTrabajo.tsx'));
const Contactanos = lazy(() => import('../pages/public/modules/contactanos/Contactanos.tsx'));
const ConsultarHabilidad = lazy(() => import('../pages/public/modules/colegiados/ConsultarHabilidad.tsx'));
const Colegiatura = lazy(() => import('../pages/public/modules/colegiados/Colegiatura.tsx'));

// Rutas protegidas con Lazy Loading
const Login = lazy(() => import('../pages/dashboard/modules/login/Login.tsx'));
const Home = lazy(() => import('../pages/dashboard/modules/inicio/InicioAdmin.tsx'));
const Colegiado = lazy(() => import('../pages/dashboard/modules/colegiados/ColegiadosMain.tsx'));
const AgregarColegiado = lazy(() => import('../pages/dashboard/modules/colegiados/AgregarColegiado.tsx'));
const EditarColegiado = lazy(() => import('../pages/dashboard/modules/colegiados/EditarColegiado.tsx'));
const Capitulos = lazy(() => import('../pages/dashboard/modules/capitulos/CapitulosEspecialidadesMain.tsx'));
const PopUp = lazy(() => import('../pages/dashboard/modules/popups/PopUpsMain.tsx'));
const Slider = lazy(() => import('../pages/dashboard/modules/sliders/SlidersMain.tsx'));
const Publicacion = lazy(() => import('../pages/dashboard/modules/publicaciones/PublicacionesPage.tsx'));
const NuevaPublicacion = lazy(() => import('../pages/dashboard/modules/publicaciones/NuevaPublicacion.tsx'));
const EditarPublicacion = lazy(() => import('../pages/dashboard/modules/publicaciones/EditarPublicacion.tsx'));
const Categoria = lazy(() => import('../pages/dashboard/modules/categorias/CategoriasPage.tsx'));
const Pago = lazy(() => import('../pages/dashboard/modules/pagos/PagosMain.tsx'));
const AgregarPagos = lazy(() => import('../pages/dashboard/modules/pagos/AgregarPagos.tsx'));
const EditarPagos = lazy(() => import('../pages/dashboard/modules/pagos/EditarPagos.tsx'));
const EstadoCuenta = lazy(() => import('../pages/dashboard/modules/estadocuenta/EstadoCuentas.tsx'));
const Tarifa = lazy(() => import('../pages/dashboard/modules/tarifas/TarifasPage.tsx'));
const Ayuda = lazy(() => import('../pages/dashboard/modules/ayuda/AyudaMain.tsx'));

const NoAutorizado = lazy(() => import('./NoAutorizado.tsx'));
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
  { path: "/normativas", element: <Normativas /> },
  { path: "/noticias", element: <Noticias /> },
  { path: "/noticias/:id/:titulo", element: <Noticia /> },
  { path: "/bolsa-trabajo", element: <BolsaTrabajo /> },
  { path: "/contactanos", element: <Contactanos /> },
  { path: "/consultar-habilidad", element: <ConsultarHabilidad /> },
  { path: "/colegiatura", element: <Colegiatura /> },
];

const adminRoutes = [
  { path: "/admin", element: <Home />, allowedGroups: ['admin', 'secretaria', 'publicador'] },
  { path: "/admin/ayuda", element: <Ayuda />, allowedGroups: ['admin', 'secretaria', 'publicador'] },

  // Permisos para secretaria
  { path: "/admin/colegiado", element: <Colegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/nuevo-colegiado", element: <AgregarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/colegiado/editar-colegiado/:id1/:id2", element: <EditarColegiado />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/capitulos", element: <Capitulos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos", element: <Pago />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/nuevo-pago", element: <AgregarPagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/editar-pago/:id", element: <EditarPagos />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/pagos/estado-cuenta", element: <EstadoCuenta />, allowedGroups: ['admin', 'secretaria'] },
  { path: "/admin/tarifas", element: <Tarifa />, allowedGroups: ['admin', 'secretaria'] },

  // Permisos para publicador
  { path: "/admin/publicaciones", element: <Publicacion />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/nueva-publicacion", element: <NuevaPublicacion />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/editar-publicacion/:id", element: <EditarPublicacion />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/publicaciones/categorias", element: <Categoria />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/anuncios", element: <PopUp />, allowedGroups: ['admin', 'publicador'] },
  { path: "/admin/galeria", element: <Slider />, allowedGroups: ['admin', 'publicador'] },
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

        {/* Rutas privadas protegidas */}
        {adminRoutes.map(({ path, element, allowedGroups }) => (
          <Route
            key={path}
            path={path}
            element={
              <GroupProtectedRoute allowedGroups={allowedGroups}>
                <AdminLayout>{element}</AdminLayout>
              </GroupProtectedRoute>
            }
          />
        ))}

        {/* Ruta para usuarios no autorizados */}
        <Route path="/no-autorizado" element={<NoAutorizado />} />

        {/* Ruta para redirigir a /admin cuando no existe */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
