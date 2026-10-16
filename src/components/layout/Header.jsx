import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { locations } from '../../data/services';
import Logo from '../common/Logo';
import Icon from '../common/Icon';
import Modal from '../common/Modal';
import './Header.css';

export default function Header() {
  const { role, setRole, location, setLocation, requests } = useDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  function changeView(value) {
    setRole(value);
    navigate(
      value === 'public'
        ? '/'
        : value === 'worker'
          ? '/trabajador'
          : value === 'admin'
            ? '/admin'
            : '/cliente',
    );
    setMenuOpen(false);
  }
  const accountPath = role === 'worker' ? '/trabajador' : role === 'admin' ? '/admin' : '/cliente';
  return (
    <>
      <div className="demo-bar">
        <div className="container demo-bar-inner">
          <span>
            Prototipo visual <span className="demo-bar-detail">· Datos de ejemplo</span>
          </span>
          <label>
            Explorar como{' '}
            <select
              aria-label="Cambiar vista de demostración"
              value={role}
              onChange={(event) => changeView(event.target.value)}
            >
              <option value="public">Visitante</option>
              <option value="client">Cliente</option>
              <option value="worker">Trabajador</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav
            className={`header-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Navegación principal"
            onClick={() => setMenuOpen(false)}
          >
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/como-funciona">Cómo funciona</NavLink>
            <NavLink to="/soy-trabajador">Soy trabajador</NavLink>
          </nav>
          <div className="header-actions">
            <div className="header-location">
              <Icon name="pin" size={17} />
              <select
                aria-label="Tu ubicación"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                {locations.map((place) => (
                  <option key={place}>{place}</option>
                ))}
              </select>
            </div>
            {role === 'public' ? (
              <>
                <Link className="header-login" to="/ingresar">
                  Ingresar
                </Link>
                <Link className="btn btn-primary btn-small header-register" to="/registro">
                  Crear cuenta
                </Link>
              </>
            ) : (
              <>
                <button
                  className="icon-btn notification-button"
                  aria-label="Ver notificaciones"
                  onClick={() => setNotificationsOpen(true)}
                >
                  <Icon name="bell" />
                  <span />
                </button>
                <Link to={accountPath} className="header-account" aria-label="Ir a mi panel">
                  {role === 'worker' ? 'ML' : role === 'admin' ? 'AD' : 'JG'}
                </Link>
              </>
            )}
            <button
              className="icon-btn menu-toggle"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      {notificationsOpen && (
        <Modal title="Notificaciones" onClose={() => setNotificationsOpen(false)}>
          <div className="notification-list">
            {requests
              .filter((request) =>
                role === 'worker' ? request.workerId === 'martin' : request.owner === 'client',
              )
              .slice(0, 3)
              .map((request) => (
                <Link
                  key={request.id}
                  to={`${accountPath}/solicitudes/${request.id}`}
                  onClick={() => setNotificationsOpen(false)}
                >
                  <span className="notification-icon">
                    <Icon name="requests" />
                  </span>
                  <div>
                    <strong>
                      {request.status === 'Pendiente'
                        ? 'Solicitud pendiente'
                        : `Solicitud ${request.status.toLowerCase()}`}
                    </strong>
                    <p>{request.title}</p>
                    <small>{request.date}</small>
                  </div>
                  <Icon name="right" size={17} />
                </Link>
              ))}
          </div>
        </Modal>
      )}
    </>
  );
}
