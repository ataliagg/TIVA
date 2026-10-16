import { reviews } from '../../data/workers';
import ReviewCard from '../reviews/ReviewCard';
import './ReviewsSection.css';
export default function ReviewsSection() {
  return (
    <section className="section reviews-section">
      <div className="section-heading">
        <div>
          <h2>Entre vecinos, nos recomendamos.</h2>
          <p>Experiencias que hacen más fácil dar el primer paso.</p>
        </div>
        <span className="tag">Opiniones de ejemplo</span>
      </div>
      <div className="reviews-grid">
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
