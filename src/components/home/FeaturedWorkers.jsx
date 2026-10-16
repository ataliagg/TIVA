import { Link } from 'react-router-dom';
import { workers } from '../../data/workers';
import WorkerCard from '../workers/WorkerCard';
import './FeaturedWorkers.css';
export default function FeaturedWorkers() {
  return (
    <section className="section featured-workers">
      <div className="section-heading">
        <div>
          <div className="eyebrow">BUENAS MANOS, CERCA TUYO</div>
          <h2>Profesionales recomendados</h2>
          <p>Conocé su trabajo y elegí con más tranquilidad.</p>
        </div>
        <Link className="text-link" to="/buscar">
          Ver profesionales
        </Link>
      </div>
      <div className="featured-workers-grid">
        {workers.slice(0, 3).map((worker) => (
          <WorkerCard worker={worker} key={worker.id} />
        ))}
      </div>
    </section>
  );
}
