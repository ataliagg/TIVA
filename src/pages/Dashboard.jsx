import { Link, useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { workers } from '../data/workers';
import SearchBar from '../components/search/SearchBar';
import RequestCard from '../components/requests/RequestCard';
import WorkerCard from '../components/workers/WorkerCard';
import Icon from '../components/common/Icon';
import './Dashboard.css';
export default function Dashboard() {
  const { worker, base } = useOutletContext();
  const { requests, reviews } = useDemo();
  const items = requests.filter((request) =>
    worker ? request.workerId === 'martin' : request.owner === 'client',
  );
  const stats = [
    {
      icon: 'clock',
      name: 'Pendientes',
      number: items.filter((request) => request.status === 'Pendiente').length,
      color: 'yellow',
    },
    {
      icon: 'calendar',
      name: 'Confirmadas',
      number: items.filter((request) => request.status === 'Confirmada').length,
      color: 'blue',
    },
    {
      icon: worker ? 'star' : 'success',
      name: worker ? 'Calificación' : 'Finalizadas',
      number: worker ? '4,9' : items.filter((request) => request.status === 'Finalizada').length,
      color: 'green',
    },
  ];
  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <span className="eyebrow">QUÉ BUENO VERTE POR ACÁ</span>
        <h1>
          Hola, {worker ? 'Martín' : 'Julieta'}
          <span> ☀</span>
        </h1>
        <p>
          {worker
            ? 'Tu trabajo conecta con nuevas oportunidades.'
            : 'Tu próximo pendiente, en buenas manos.'}
        </p>
        {worker ? (
          <Link to="/trabajador/perfil" className="btn btn-outline btn-small">
            Editar mi perfil profesional
          </Link>
        ) : (
          <SearchBar compact />
        )}
      </section>
      <div className="dashboard-stats">
        {stats.map((stat) => (
          <div className="panel" key={stat.name}>
            <span className={`dashboard-stat-icon service-color-${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </span>
            <div>
              <strong>{stat.number}</strong>
              <p>{stat.name}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="dashboard-section">
        <div className="section-heading">
          <h2>{worker ? 'Solicitudes para vos' : 'Tus últimas solicitudes'}</h2>
          <Link to={`${base}/solicitudes`} className="text-link">
            Ver todas
          </Link>
        </div>
        <div className="dashboard-requests">
          {items.slice(0, 3).map((request) => (
            <RequestCard key={request.id} request={request} worker={worker} />
          ))}
        </div>
      </section>
      {worker ? (
        <section className="panel dashboard-review">
          <div className="section-heading">
            <h2>Tu trabajo deja huella.</h2>
            <Icon name="star" />
          </div>
          <p>“{reviews.find((review) => review.workerId === 'martin')?.text}”</p>
          <Link to="/trabajador/calificaciones" className="text-link">
            Ver mis calificaciones
          </Link>
        </section>
      ) : (
        <section className="dashboard-section">
          <div className="section-heading">
            <h2>También podés contar con ellos</h2>
            <Link to="/buscar" className="text-link">
              Ver más
            </Link>
          </div>
          <div className="dashboard-workers">
            {workers.slice(0, 2).map((person) => (
              <WorkerCard worker={person} key={person.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
