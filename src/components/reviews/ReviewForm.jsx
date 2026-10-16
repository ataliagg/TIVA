import { useState } from 'react';
import Icon from '../common/Icon';
import './ReviewForm.css';
export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState([]);
  return (
    <form
      className="review-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (rating) onSubmit({ rating, comment, tags });
      }}
    >
      <h2>¿Cómo fue tu experiencia?</h2>
      <p>Tu opinión ayuda a otros vecinos a elegir.</p>
      <fieldset className="review-stars">
        <legend className="sr-only">Seleccioná una calificación obligatoria</legend>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className={value <= rating ? 'selected' : ''}>
            <input
              type="radio"
              name="rating"
              value={value}
              checked={rating === value}
              onChange={() => setRating(value)}
              required
              aria-label={`${value} ${value === 1 ? 'estrella' : 'estrellas'}`}
            />
            <Icon name="star" size={42} fill={value <= rating ? 'currentColor' : 'none'} />
          </label>
        ))}
      </fieldset>
      <span className="review-rating-label">
        {rating
          ? ['', 'Puede mejorar', 'Regular', 'Buena', 'Muy buena', '¡Excelente!'][rating]
          : 'Seleccioná de 1 a 5 estrellas'}
      </span>
      <label className="field">
        Contanos un poco más <span className="muted">(opcional)</span>
        <textarea
          maxLength={300}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="¿Qué te pareció el trabajo realizado?"
        />
        <small className="character-count">{comment.length}/300</small>
      </label>
      <div className="review-highlights">
        <p>¿Qué aspectos destacás?</p>
        <div>
          {['Puntual', 'Amable', 'Buen trabajo', 'Rápido'].map((tag, index) => (
            <button
              type="button"
              aria-pressed={tags.includes(tag)}
              className={tags.includes(tag) ? 'selected' : ''}
              key={tag}
              onClick={() =>
                setTags(tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag])
              }
            >
              <Icon name={['clock', 'heart', 'hammer', 'zap'][index]} size={16} />
              {tag}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-primary btn-wide" disabled={!rating}>
        Enviar calificación
      </button>
    </form>
  );
}
