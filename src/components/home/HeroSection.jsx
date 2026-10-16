import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import Icon from '../common/Icon';
import { useDemo } from '../../context/DemoContext';
import './HeroSection.css';
export default function HeroSection() {
  const { location } = useDemo();
  return (
    <section className="hero-section">
      <div className="hero-main">
        <span className="hero-location">
          <Icon name="pin" size={14} /> Cerca tuyo, en {location}
        </span>
        <h1>
          Tu casa necesita algo.
          <br />
          <span>Tu barrio tiene a alguien.</span>
        </h1>
        <p>
          Encontrá personas de confianza para resolver
          <br className="hero-break" /> lo que necesitás, sin dar tantas vueltas.
        </p>
        <SearchBar />
        <div className="hero-trust">
          <span>
            <Icon name="shield" size={15} /> Perfiles con identidad verificada
          </span>
          <span>
            <Icon name="star" size={15} /> Opiniones de la comunidad
          </span>
        </div>
      </div>
      <aside className="hero-aside">
        <span className="urgent-icon">
          <Icon name="zap" size={28} />
        </span>
        <span className="hero-aside-label">PARA ESO QUE NO PUEDE ESPERAR</span>
        <h2>
          ¿Lo necesitás <br />
          cuanto antes?
        </h2>
        <p>Encontrá profesionales que reciben solicitudes urgentes.</p>
        <Link to="/buscar?urgente=si" className="btn btn-outline">
          Buscar ayuda urgente
        </Link>
        <span className="hero-aside-note">
          <Icon name="clock" size={13} /> Consultá su disponibilidad
        </span>
      </aside>
    </section>
  );
}
