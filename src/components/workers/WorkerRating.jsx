import Icon from '../common/Icon';
import './WorkerRating.css';
export default function WorkerRating({ rating, count, full = false }) {
  return (
    <div
      className="worker-rating"
      aria-label={`${rating} de 5 estrellas${count ? `, ${count} opiniones` : ''}`}
    >
      <span className="rating-stars">
        {Array.from({ length: full ? 5 : 1 }, (_, i) => (
          <Icon key={i} name="star" size={15} fill="currentColor" />
        ))}
      </span>
      <strong>{rating.toLocaleString('es-AR', { minimumFractionDigits: 1 })}</strong>
      {count !== undefined && <span>({count} opiniones)</span>}
    </div>
  );
}
