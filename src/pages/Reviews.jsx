import { Link, useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import ReviewCard from '../components/reviews/ReviewCard';
import RequestCard from '../components/requests/RequestCard';
import EmptyState from '../components/common/EmptyState';
import './Reviews.css';
export default function Reviews() {
  const { worker } = useOutletContext();
  const { reviews, requests } = useDemo();
  const items = reviews.filter((review) =>
    worker ? review.workerId === 'martin' : review.name === 'Julieta García',
  );
  const pending = requests.filter(
    (request) => request.owner === 'client' && request.status === 'Finalizada' && !request.reviewed,
  );
  return (
    <div className="reviews-page">
      <div className="page-heading">
        <h1>{worker ? 'Lo que dicen de tu trabajo' : 'Mis calificaciones'}</h1>
        <p>
          {worker
            ? 'La confianza también se construye con cada experiencia.'
            : 'Tu experiencia hace más fuerte a la comunidad.'}
        </p>
      </div>
      {!worker && pending.length > 0 && (
        <section className="reviews-pending">
          <h2>Te queda una opinión por compartir</h2>
          {pending.map((request) => (
            <RequestCard request={request} key={request.id} />
          ))}
        </section>
      )}
      <div className="account-reviews-grid">
        {items.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
      {items.length === 0 && (
        <EmptyState
          icon="star"
          title="Tus opiniones van a aparecer acá"
          description="Después de un servicio finalizado, podés compartir tu experiencia."
        >
          <Link to="/cliente/solicitudes" className="btn btn-outline">
            Ver mis solicitudes
          </Link>
        </EmptyState>
      )}
    </div>
  );
}
