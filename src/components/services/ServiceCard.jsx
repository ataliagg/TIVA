import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import './ServiceCard.css';
export default function ServiceCard({ service, detailed = false }) {
  return (
    <Link
      className={`service-card ${detailed ? 'service-card-detailed' : ''}`}
      to={`/buscar?servicio=${service.id}`}
    >
      <span className={`service-card-icon service-color-${service.color}`}>
        <Icon name={service.icon} size={29} />
      </span>
      <h3>{service.name}</h3>
      {detailed && <p>{service.description}</p>}
      <span className="service-card-action">
        Encontrar profesionales <Icon name="right" size={14} />
      </span>
    </Link>
  );
}
