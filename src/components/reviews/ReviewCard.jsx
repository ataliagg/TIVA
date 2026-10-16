import Avatar from '../common/Avatar';
import WorkerRating from '../workers/WorkerRating';
import './ReviewCard.css';
export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <WorkerRating rating={review.rating} full />
      <p>“{review.text}”</p>
      <div className="review-card-person">
        <Avatar person={review} size="small" />
        <div>
          <strong>{review.name}</strong>
          <span>
            {review.service} · {review.date}
          </span>
        </div>
      </div>
    </article>
  );
}
