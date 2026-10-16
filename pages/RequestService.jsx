import { Link, useParams } from 'react-router-dom';
import { workers } from '../data/workers';
import RequestForm from '../components/requests/RequestForm';
import Icon from '../components/common/Icon';
import EmptyState from '../components/common/EmptyState';
import './RequestService.css';
export default function RequestService() {
  const { id } = useParams();
  const worker = workers.find((item) => item.id === id);
  return (
    <div className="request-service-page container page">
      <Link to={worker ? `/profesionales/${id}` : '/buscar'} className="back-link">
        <Icon name="back" size={16} />
        Volver al perfil
      </Link>
      <div className="page-heading">
        <h1>Un paso más cerca de resolverlo.</h1>
        <p>Contale al profesional qué necesitás y solicitá un presupuesto.</p>
      </div>
      {worker?.available ? (
        <div className="panel">
          <RequestForm worker={worker} />
        </div>
      ) : (
        <EmptyState
          title="Este profesional no está disponible"
          description="Volvé a los resultados para encontrar otra persona que pueda ayudarte."
        >
          <Link to="/buscar" className="btn btn-primary">
            Buscar profesionales
          </Link>
        </EmptyState>
      )}
    </div>
  );
}
