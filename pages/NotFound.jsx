import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import './NotFound.css';
export default function NotFound() {
  return (
    <div className="not-found container page">
      <span>404</span>
      <h1>Por acá no era.</h1>
      <p>
        La página que buscás no está disponible.
        <br />
        Volvamos a un lugar conocido.
      </p>
      <Link className="btn btn-primary" to="/">
        <Icon name="home" size={18} />
        Volver al inicio
      </Link>
    </div>
  );
}
