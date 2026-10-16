import { NavLink, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import Icon from '../common/Icon';
import Avatar from '../common/Avatar';
import './Sidebar.css';
export default function Sidebar({ worker = false }) {
  const base = worker ? '/trabajador' : '/cliente';
  const { setRole } = useDemo();
  const navigate = useNavigate();
  const links = [
    { to: base, name: 'Mi inicio', icon: 'dashboard', end: true },
    {
      to: worker ? `${base}/servicios` : '/buscar',
      name: worker ? 'Mis servicios' : 'Buscar profesional',
      icon: worker ? 'briefcase' : 'search',
    },
    {
      to: `${base}/solicitudes`,
      name: worker ? 'Solicitudes recibidas' : 'Mis solicitudes',
      icon: 'requests',
    },
    { to: `${base}/mensajes`, name: 'Mensajes', icon: 'chat' },
    { to: `${base}/calificaciones`, name: 'Calificaciones', icon: 'star' },
    { to: `${base}/perfil`, name: 'Mi perfil', icon: 'user' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <Avatar
          size="medium"
          person={
            worker
              ? { name: 'Martín López', photo: '/images/martin.webp' }
              : { name: 'Julieta García', initials: 'JG' }
          }
        />
        <strong>{worker ? 'Martín López' : 'Julieta García'}</strong>
        <span>{worker ? 'Cuenta de trabajador' : 'Cuenta de cliente'}</span>
      </div>
      <nav aria-label={worker ? 'Panel del trabajador' : 'Panel del cliente'}>
        {links.map((link) => (
          <NavLink to={link.to} end={link.end} key={link.to}>
            <Icon name={link.icon} size={18} />
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to="/ayuda">
          <Icon name="help" size={18} />
          Centro de ayuda
        </NavLink>
        <button
          onClick={() => {
            setRole('public');
            navigate('/');
          }}
        >
          <Icon name="logout" size={18} />
          Salir de la demo
        </button>
      </div>
    </aside>
  );
}
