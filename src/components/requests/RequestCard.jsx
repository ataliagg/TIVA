import { Link } from 'react-router-dom';
import { workers } from '../../data/workers';
import { getService } from '../../data/services';
import { useDemo } from '../../context/DemoContext';
import Icon from '../common/Icon';
import RequestStatus from './RequestStatus';
import './RequestCard.css';
export default function RequestCard({ request, worker = false }) {
  const professional = workers.find((item) => item.id === request.workerId);
  const service = getService(request.service);
  const base = worker ? '/trabajador' : '/cliente';
  const { updateRequest, notify } = useDemo();
  return (
    <article className="request-card">
      <div className={`request-card-icon service-color-${service.color}`}>
        <Icon name={service.icon} size={29} />
      </div>
      <div className="request-card-content">
        <div className="request-card-title">
          <h3>{worker ? request.client : service.name}</h3>
          <RequestStatus status={request.status} />
        </div>
        <p className="request-card-description">{request.title}</p>
        <div className="request-card-meta">
          <span>
            <Icon name="user" size={14} />
            {worker ? service.name : professional?.name}
          </span>
          <span>
            <Icon name="pin" size={14} />
            {request.location}
          </span>
          <span>
            <Icon name="clock" size={14} />
            {request.date}
          </span>
        </div>
        <div className="request-card-actions">
          {request.urgency === 'Urgente' && (
            <span className="request-urgent">
              <Icon name="zap" size={13} />
              Urgente
            </span>
          )}
          <Link className="btn btn-outline btn-small" to={`${base}/solicitudes/${request.id}`}>
            Ver detalle
          </Link>
          {worker && request.status === 'Pendiente' && (
            <button
              className="btn btn-primary btn-small"
              onClick={() => {
                updateRequest(request.id, {
                  status: 'Confirmada',
                  history: [...request.history, 'Visita confirmada'],
                });
                notify('Solicitud aceptada en la demo.');
              }}
            >
              Aceptar
            </button>
          )}
          {!worker && request.status === 'Finalizada' && !request.reviewed && (
            <Link className="btn btn-primary btn-small" to={`/cliente/calificar/${request.id}`}>
              Calificar
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
