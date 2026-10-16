import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { locations, services } from '../data/services';
import Icon from '../components/common/Icon';
import './Register.css';
export default function Register() {
  const [params, setParams] = useSearchParams();
  const type = params.get('tipo') === 'trabajador' ? 'worker' : 'client';
  const [visible, setVisible] = useState(false);
  const { setRole, notify } = useDemo();
  const navigate = useNavigate();
  function register(event) {
    event.preventDefault();
    setRole(type);
    notify('Formulario validado. Estás explorando una cuenta ficticia.');
    navigate(type === 'worker' ? '/trabajador/perfil' : '/cliente');
  }
  return (
    <div className="register-page container page">
      <Link to="/" className="back-link">
        <Icon name="back" size={16} />
        Volver al inicio
      </Link>
      <div className="page-heading">
        <span className="eyebrow">SUMATE A TU COMUNIDAD</span>
        <h1>Todo empieza por conectar.</h1>
        <p>
          {type === 'worker'
            ? 'Creá tu perfil y acercá tu oficio a nuevos vecinos.'
            : 'Creá tu cuenta y encontrá ayuda cerca tuyo.'}
        </p>
      </div>
      <section className="panel register-card">
        <div className="auth-type-selector">
          <button
            className={type === 'client' ? 'active' : ''}
            onClick={() => setParams({ tipo: 'cliente' })}
            aria-pressed={type === 'client'}
          >
            <Icon name="user" size={19} />
            Soy cliente
          </button>
          <button
            className={type === 'worker' ? 'active' : ''}
            onClick={() => setParams({ tipo: 'trabajador' })}
            aria-pressed={type === 'worker'}
          >
            <Icon name="briefcase" size={19} />
            Soy trabajador
          </button>
        </div>
        <form className="form-stack" onSubmit={register}>
          <div className="field-grid">
            <label className="field">
              Nombre
              <input required placeholder="Tu nombre" name="firstName" autoComplete="off" />
            </label>
            <label className="field">
              Apellido
              <input required placeholder="Tu apellido" name="lastName" autoComplete="off" />
            </label>
          </div>
          <div className="field-grid">
            <label className="field">
              DNI
              <input
                required
                inputMode="numeric"
                pattern="[0-9]{7,8}"
                title="Ingresá 7 u 8 dígitos, sin puntos"
                placeholder="Sin puntos"
                name="dni"
              />
            </label>
            <label className="field">
              Teléfono
              <input
                required
                type="tel"
                name="phone"
                pattern="[0-9+() -]{6,20}"
                placeholder="Ej.: 381 000 0000"
              />
            </label>
          </div>
          <label className="field">
            Correo electrónico
            <input required type="email" name="email" placeholder="ejemplo@correo.com" />
          </label>
          <label className="field">
            Ubicación
            <select name="location" required defaultValue="">
              <option value="" disabled>
                Elegí tu localidad
              </option>
              {locations.map((place) => (
                <option key={place}>{place}</option>
              ))}
            </select>
          </label>
          {type === 'worker' && (
            <label className="field">
              Tu rubro principal
              <select required name="service" defaultValue="">
                <option value="" disabled>
                  Seleccioná tu oficio
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="field">
            Contraseña
            <div className="password-field">
              <input
                required
                type={visible ? 'text' : 'password'}
                minLength={8}
                name="password"
                placeholder="Creá una contraseña de ejemplo"
                autoComplete="off"
              />
              <button
                type="button"
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setVisible(!visible)}
              >
                <Icon name={visible ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
            <small>Usá al menos 8 caracteres.</small>
          </label>
          <label className="check-label">
            <input type="checkbox" required />
            <span>
              Acepto los{' '}
              <Link to="/legal/terminos" className="text-link">
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link to="/legal/privacidad" className="text-link">
                política de privacidad
              </Link>{' '}
              del prototipo.
            </span>
          </label>
          <div className="notice">
            <Icon name="help" size={17} />
            <span>
              Este formulario es una demostración visual. Usá datos ficticios; no crea una cuenta
              real.
            </span>
          </div>
          <button className="btn btn-primary" type="submit">
            {type === 'worker' ? 'Continuar con mi perfil' : 'Crear cuenta'}
          </button>
        </form>
        <p className="auth-switch">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/ingresar" className="text-link">
            Ingresar
          </Link>
        </p>
      </section>
    </div>
  );
}
