import { NavLink } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import Icon from '../common/Icon';
import './BottomNav.css';
export default function BottomNav() {
  const { role } = useDemo();
  const base = role === 'worker' ? '/trabajador' : '/cliente';
  return (
    <nav className="bottom-nav" aria-label="Navegación móvil">
      <NavLink to={role === 'public' ? '/' : base} end>
        <Icon name="home" />
        <span>Inicio</span>
      </NavLink>
      <NavLink to="/buscar">
        <Icon name="search" />
        <span>Buscar</span>
      </NavLink>
      <NavLink to={`${base}/solicitudes`}>
        <Icon name="requests" />
        <span>Solicitudes</span>
      </NavLink>
      <NavLink to={`${base}/mensajes`}>
        <Icon name="chat" />
        <span>Mensajes</span>
      </NavLink>
      <NavLink to={role === 'public' ? '/ingresar' : `${base}/perfil`}>
        <Icon name="user" />
        <span>Perfil</span>
      </NavLink>
    </nav>
  );
}
