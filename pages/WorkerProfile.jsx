import { Link, useParams } from 'react-router-dom';
import { workers } from '../data/workers';
import { getService, money } from '../data/services';
import { useDemo } from '../context/DemoContext';
import Avatar from '../components/common/Avatar';
import Icon from '../components/common/Icon';
import WorkerRating from '../components/workers/WorkerRating';
import WorkerGallery from '../components/workers/WorkerGallery';
import ReviewCard from '../components/reviews/ReviewCard';
import EmptyState from '../components/common/EmptyState';
import './WorkerProfile.css';
export default function WorkerProfile() {
  const { id } = useParams();
  const worker = workers.find((item) => item.id === id);
  const { reviews } = useDemo();
  if (!worker)
    return (
      <div className="container page">
        <EmptyState
          title="No encontramos este perfil"
          description="Volvé a la búsqueda para conocer a otros profesionales."
        >
          <Link to="/buscar" className="btn btn-primary">
            Buscar profesionales
          </Link>
        </EmptyState>
      </div>
    );
  const workerReviews = reviews.filter((review) => review.workerId === id);
  return (
    <div className="profile-page container page">
      <Link className="back-link" to="/buscar">
        <Icon name="back" size={16} /> Volver a profesionales
      </Link>
      <div className="profile-layout">
        <div className="profile-main">
          <section className="panel profile-header">
            <div className="profile-identity">
              <Avatar person={worker} size="large" />
              <div>
                <span className="tag">{getService(worker.service).name}</span>
                <h1>
                  {worker.name}
                  {worker.identity && (
                    <Icon name="verified" className="profile-verified" size={24} />
                  )}
                </h1>
                <p>
                  <Icon name="pin" size={16} />
                  {worker.location}
                </p>
                <WorkerRating rating={worker.rating} count={worker.reviewCount} full />
              </div>
            </div>
            <div className="profile-stats">
              <div>
                <Icon name="briefcase" />
                <strong>{worker.jobs}</strong>
                <span>Trabajos realizados</span>
              </div>
              <div>
                <Icon name="shield" />
                <strong>{worker.experience} años</strong>
                <span>De experiencia</span>
              </div>
              <div>
                <Icon name="chat" />
                <strong>{worker.response}</strong>
                <span>Respuesta promedio</span>
              </div>
            </div>
          </section>
          <section className="panel">
            <h2>Un poco sobre mí</h2>
            <p className="profile-description">{worker.description}</p>
            <h3>¿En qué puedo ayudarte?</h3>
            <div className="tags profile-skills">
              {worker.skills.map((skill) => (
                <span className="tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            <div className="profile-zones">
              <Icon name="pin" size={19} />
              <p>
                <strong>Zonas de trabajo</strong>
                {worker.zones.join(' · ')}
              </p>
            </div>
          </section>
          <section className="panel">
            <div className="section-heading">
              <h2>Mis trabajos</h2>
              <span className="muted">Fotos de ejemplo</span>
            </div>
            {worker.service === 'plomeria' ? (
              <WorkerGallery />
            ) : (
              <EmptyState
                icon="image"
                title="Próximamente, más trabajos"
                description="Este perfil de ejemplo todavía no tiene fotos de su trabajo."
              />
            )}
          </section>
          <section className="panel">
            <div className="section-heading">
              <h2>Lo que dicen sus clientes</h2>
              <WorkerRating rating={worker.rating} />
            </div>
            <div className="profile-reviews">
              {workerReviews.length ? (
                workerReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <p className="muted">
                  Todavía no hay comentarios detallados en este perfil de ejemplo.
                </p>
              )}
            </div>
          </section>
        </div>
        <aside className="profile-booking panel">
          <span className={`profile-availability ${worker.available ? '' : 'is-unavailable'}`}>
            <Icon name="clock" size={16} />
            {worker.available ? 'Disponible esta semana' : 'Sin disponibilidad por ahora'}
          </span>
          <h2>
            Empecemos por
            <br />
            lo que necesitás.
          </h2>
          <p>Contame tu problema y coordinamos un presupuesto.</p>
          <div className="profile-price">
            <span>Visita desde</span>
            <strong>{money(worker.price)}</strong>
            <small>Precio orientativo · El valor final se acuerda según el trabajo.</small>
          </div>
          {worker.available ? (
            <Link className="btn btn-primary btn-wide" to={`/solicitar/${worker.id}`}>
              <Icon name="calendar" size={18} />
              Solicitar presupuesto
            </Link>
          ) : (
            <button className="btn btn-primary btn-wide" disabled>
              No disponible
            </button>
          )}
          <div className="profile-booking-info">
            <Icon name="shield" size={17} />
            <span>Podés enviar fotos y consultar antes de confirmar el trabajo.</span>
          </div>
          <div className="divider" />
          <h3>Disponibilidad</h3>
          <p className="profile-hours">
            <Icon name="clock" size={16} />
            Lun. a sáb. · 8:00 a 18:00
          </p>
          <p className="profile-identity-note">
            La identidad indicada en este prototipo es ilustrativa. No representa una verificación
            de matrícula profesional.
          </p>
        </aside>
      </div>
    </div>
  );
}
