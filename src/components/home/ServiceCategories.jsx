import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import ServiceCard from '../services/ServiceCard';
import './ServiceCategories.css';
export default function ServiceCategories() {
  return (
    <section className="section service-categories">
      <div className="section-heading">
        <div>
          <h2>¿En qué te podemos ayudar?</h2>
          <p>Ese pendiente de tu casa, un poco más cerca de resolverse.</p>
        </div>
        <Link className="text-link" to="/servicios">
          Ver todos los servicios
        </Link>
      </div>
      <div className="service-categories-grid">
        {services.slice(0, 6).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
