import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import Icon from '../components/common/Icon';
import Modal from '../components/common/Modal';
import './Login.css';
export default function Login() {
  const { setRole, notify } = useDemo();
  const [type, setType] = useState('client');
  const [visible, setVisible] = useState(false);
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();
  function enter() {
    setRole(type);
    navigate(type === 'worker' ? '/trabajador' : '/cliente');
    notify('Ingresaste a la vista de ejemplo. No se verificaron credenciales.');
  }
  return (
    <div className="login-page container page">
      <div className="login-story">
        <span className="eyebrow">QUÉ BUENO TENERTE DE VUELTA</span>
        <h1>
          Las mejores soluciones
          <br />
          empiezan cerca.
        </h1>
        <p>
          Tu casa, tu trabajo, tu barrio.
          <br />
          Todo conectado en un mismo lugar.
        </p>
        <div className="login-benefits">
          <span>
            <Icon name="shield" />
            Conocé a quien te va a ayudar.
          </span>
          <span>
            <Icon name="chat" />
            Coordiná sin tantas vueltas.
          </span>
          <span>
            <Icon name="star" />
            Elegí con la experiencia de otros vecinos.
          </span>
        </div>
        <div className="login-quote">
          “Encontré a la persona indicada, en mi zona y en el momento que la necesitaba.”
          <span>Una experiencia de ejemplo en TIVA</span>
        </div>
      </div>
      <section className="login-card panel">
        <span className="tag">BIENVENIDO A TIVA</span>
        <h2>Volvé a conectar.</h2>
        <p>Ingresá a tu cuenta para continuar.</p>
        <div className="auth-type-selector">
          <button
            className={type === 'client' ? 'active' : ''}
            onClick={() => setType('client')}
            aria-pressed={type === 'client'}
          >
            <Icon name="user" size={18} />
            Cliente
          </button>
          <button
            className={type === 'worker' ? 'active' : ''}
            onClick={() => setType('worker')}
            aria-pressed={type === 'worker'}
          >
            <Icon name="briefcase" size={18} />
            Trabajador
          </button>
        </div>
        <form
          className="form-stack"
          onSubmit={(event) => {
            event.preventDefault();
            enter();
          }}
        >
          <label className="field">
            Correo electrónico
            <input type="email" autoComplete="off" required placeholder="ejemplo@correo.com" />
          </label>
          <label className="field">
            Contraseña
            <div className="password-field">
              <input
                type={visible ? 'text' : 'password'}
                required
                minLength={6}
                autoComplete="off"
                placeholder="Ingresá tu contraseña"
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <Icon name={visible ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
          </label>
          <button className="auth-forgot link-button" type="button" onClick={() => setForgot(true)}>
            Olvidé mi contraseña
          </button>
          <button className="btn btn-primary btn-wide">Ingresar</button>
        </form>
        <div className="auth-separator">
          <span>O explorá sin completar datos</span>
        </div>
        <button className="btn btn-outline btn-wide" onClick={enter}>
          Probar vista de {type === 'client' ? 'cliente' : 'trabajador'}
        </button>
        <p className="auth-switch">
          ¿Todavía no tenés cuenta?{' '}
          <Link to="/registro" className="text-link">
            Registrate
          </Link>
        </p>
        <p className="auth-demo-note">
          <Icon name="help" size={14} />
          Maqueta sin acceso real. No ingreses contraseñas personales.
        </p>
      </section>
      {forgot && (
        <Modal title="Recuperar contraseña" onClose={() => setForgot(false)}>
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              setForgot(false);
              notify(
                'Vista previa: la recuperación por correo estará disponible al conectar el backend.',
              );
            }}
          >
            <p className="muted">
              Ingresá el correo de tu cuenta. En la versión final recibirás las instrucciones para
              restablecerla.
            </p>
            <label className="field">
              Correo electrónico
              <input required type="email" placeholder="ejemplo@correo.com" />
            </label>
            <button className="btn btn-primary">Solicitar recuperación</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
