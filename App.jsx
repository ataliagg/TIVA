import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import SearchWorkers from './pages/SearchWorkers';
import WorkerProfile from './pages/WorkerProfile';
import RequestService from './pages/RequestService';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import RequestDetail from './pages/RequestDetail';
import Messages from './pages/Messages';
import Reviews from './pages/Reviews';
import RateService from './pages/RateService';
import Profile from './pages/Profile';
import WorkerServices from './pages/WorkerServices';
import Information from './pages/Information';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Toast from './components/common/Toast';
import './App.css';
export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    document.title = 'TIVA · Servicios cerca tuyo';
  }, [pathname, hash]);
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Services />} />
          <Route path="buscar" element={<SearchWorkers />} />
          <Route path="profesionales/:id" element={<WorkerProfile />} />
          <Route path="solicitar/:id" element={<RequestService />} />
          <Route path="ingresar" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="como-funciona" element={<Information type="how" />} />
          <Route path="soy-trabajador" element={<Information type="worker" />} />
          <Route path="ayuda" element={<Information type="help" />} />
          <Route path="legal/:kind" element={<Information type="legal" />} />
          <Route path="cliente" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="solicitudes" element={<Requests />} />
            <Route path="solicitudes/:id" element={<RequestDetail />} />
            <Route path="mensajes" element={<Messages />} />
            <Route path="calificaciones" element={<Reviews />} />
            <Route path="calificar/:id" element={<RateService />} />
            <Route path="perfil" element={<Profile key="client" />} />
          </Route>
          <Route path="trabajador" element={<DashboardLayout worker />}>
            <Route index element={<Dashboard />} />
            <Route path="solicitudes" element={<Requests />} />
            <Route path="solicitudes/:id" element={<RequestDetail />} />
            <Route path="mensajes" element={<Messages />} />
            <Route path="calificaciones" element={<Reviews />} />
            <Route path="servicios" element={<WorkerServices />} />
            <Route path="perfil" element={<Profile key="worker" />} />
          </Route>
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}
