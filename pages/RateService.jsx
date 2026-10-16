import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { workers } from '../data/workers';
import { getService } from '../data/services';
import ReviewForm from '../components/reviews/ReviewForm';
import Avatar from '../components/common/Avatar';
import Icon from '../components/common/Icon';
import EmptyState from '../components/common/EmptyState';
import './RateService.css';
export default function RateService() {
  const { id } = useParams();
  const { requests, updateRequest, setReviews, notify } = useDemo();
  const navigate = useNavigate();
  const request = requests.find((item) => item.id === id && item.owner === 'client');
  if (!request || request.status !== 'Finalizada' || request.reviewed)
    return (
      <EmptyState
        icon="star"
        title={
          request?.reviewed
            ? 'Ya calificaste este servicio'
            : 'Primero tiene que finalizar el trabajo'
        }
        description="Las calificaciones corresponden a servicios realizados."
      >
        <Link to="/cliente/solicitudes" className="btn btn-primary">
          Ver mis solicitudes
        </Link>
      </EmptyState>
    );
  const worker = workers.find((item) => item.id === request.workerId);
  function submit({ rating, comment, tags }) {
    setReviews((reviews) => [
      {
        id: Date.now(),
        workerId: worker.id,
        name: 'Julieta García',
        initials: 'JG',
        rating,
        date: 'Ahora',
        text: comment || tags.join(' · ') || 'Servicio calificado.',
        service: getService(request.service).name,
      },
      ...reviews,
    ]);
    updateRequest(id, { reviewed: true, rating });
    notify('¡Gracias! Tu calificación quedó guardada en la demo.');
    navigate('/cliente/calificaciones');
  }
  return (
    <section className="rate-service-page panel">
      <span className="success-icon">
        <Icon name="check" size={37} />
      </span>
      <h1>¡Un pendiente menos!</h1>
      <p>El trabajo finalizó. Ahora tu experiencia puede ayudar a alguien más.</p>
      <div className="rate-worker">
        <Avatar person={worker} />
        <div>
          <strong>{worker.name}</strong>
          <span>{getService(worker.service).profession}</span>
        </div>
        <Link to={`/profesionales/${worker.id}`} className="text-link">
          Ver perfil
        </Link>
      </div>
      <ReviewForm onSubmit={submit} />
      <Link to="/cliente/solicitudes" className="rate-skip text-link">
        Calificar en otro momento
      </Link>
    </section>
  );
}
