import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import Icon from '../common/Icon';
import './Footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Personas de confianza.
              <br />
              Soluciones cerca tuyo.
            </p>
            <span>
              <Icon name="pin" size={15} /> Hecho para conectar Tucumán.
            </span>
          </div>
          <div>
            <h3>Encontrá tu solución</h3>
            <Link to="/buscar?servicio=plomeria">Plomería</Link>
            <Link to="/buscar?servicio=electricidad">Electricidad</Link>
            <Link to="/buscar?servicio=limpieza">Limpieza</Link>
            <Link to="/servicios">Todos los servicios</Link>
          </div>
          <div>
            <h3>Conocé TIVA</h3>
            <Link to="/como-funciona">Cómo funciona</Link>
            <Link to="/soy-trabajador">Ofrecé tus servicios</Link>
            <Link to="/ayuda">Preguntas frecuentes</Link>
            <Link to="/ingresar">Ingresar a mi cuenta</Link>
          </div>
          <div className="footer-support">
            <h3>Estamos para ayudarte</h3>
            <p>
              Encontrá respuestas para dar
              <br />
              tu próximo paso.
            </p>
            <Link className="text-link" to="/ayuda">
              <Icon name="chat" size={17} /> Centro de ayuda
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TIVA. Todos los derechos reservados.</span>
          <div>
            <Link to="/legal/terminos">Términos y condiciones</Link>
            <Link to="/legal/privacidad">Privacidad</Link>
          </div>
          <span className="footer-love">
            Hecho con <Icon name="heart" size={13} /> en Tucumán
          </span>
        </div>
      </div>
    </footer>
  );
}
