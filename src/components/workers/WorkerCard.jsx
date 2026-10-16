import { Link } from 'react-router-dom';
import { getService, money } from '../../data/services';
import Avatar from '../common/Avatar';
import Icon from '../common/Icon';
import WorkerRating from './WorkerRating';
import './WorkerCard.css';
export default function WorkerCard({ worker, horizontal = false }) {
  const service = getService(worker.service);
  return (
    <article className={`worker-card ${horizontal ? 'worker-card-horizontal' : ''}`}>
      <div className="worker-card-top">
        <div className="worker-avatar">
          <Avatar person={worker} />
          {worker.identity && (
            <span className="worker-verified" title="Identidad de ejemplo">
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
          )}
        </div>
        <div className="worker-card-name">
          <Link to={`/profesionales/${worker.id}`}>
            <h3>{worker.name}</h3>
          </Link>
          <p>{service.profession}</p>
          <WorkerRating rating={worker.rating} count={worker.reviewCount} />
        </div>
      </div>
      <div className="worker-card-info">
        <span>
          <Icon name="pin" size={15} />
          {worker.location}
        </span>
        <span className={worker.available ? 'worker-available' : 'worker-unavailable'}>
          <Icon name="clock" size={14} />
          {worker.available ? 'Disponible esta semana' : 'Sin disponibilidad'}
        </span>
      </div>
      {horizontal && <p className="worker-card-description">{worker.description}</p>}
      <div className="worker-card-bottom">
        <span>
          Visita desde <strong>{money(worker.price)}</strong>
        </span>
        <Link className="btn btn-outline btn-small" to={`/profesionales/${worker.id}`}>
          Ver perfil
        </Link>
      </div>
    </article>
  );
}
