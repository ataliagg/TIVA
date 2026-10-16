import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import RequestCard from '../components/requests/RequestCard';
import EmptyState from '../components/common/EmptyState';
import './Requests.css';
export default function Requests() {
  const { worker } = useOutletContext();
  const { requests } = useDemo();
  const [filter, setFilter] = useState('Todas');
  const items = requests.filter(
    (request) =>
      (worker ? request.workerId === 'martin' : request.owner === 'client') &&
      (filter === 'Todas' ||
        (filter === 'Historial'
          ? ['Finalizada', 'Cancelada', 'Rechazada'].includes(request.status)
          : request.status === filter)),
  );
  return (
    <div className="requests-page">
      <div className="page-heading">
        <h1>{worker ? 'Solicitudes recibidas' : 'Mis solicitudes'}</h1>
        <p>
          {worker
            ? 'Nuevos vecinos que necesitan una mano.'
            : 'Seguí el estado de tus pedidos, en un solo lugar.'}
        </p>
      </div>
      <div className="tabs" aria-label="Filtrar solicitudes">
        {['Todas', 'Pendiente', 'Presupuestada', 'Confirmada', 'Historial'].map((status) => (
          <button
            className={`tab ${status === filter ? 'active' : ''}`}
            aria-pressed={status === filter}
            onClick={() => setFilter(status)}
            key={status}
          >
            {{
              Pendiente: 'Pendientes',
              Presupuestada: 'Presupuestadas',
              Confirmada: 'Confirmadas',
            }[status] || status}
          </button>
        ))}
      </div>
      <div className="requests-list">
        {items.map((request) => (
          <RequestCard key={request.id} request={request} worker={worker} />
        ))}
      </div>
      {!items.length && (
        <EmptyState
          icon="requests"
          title="Por acá todavía no hay solicitudes"
          description="Cuando tengas pedidos en este estado, los vas a encontrar acá."
        >
          <button className="btn btn-outline" onClick={() => setFilter('Todas')}>
            Ver todas
          </button>
        </EmptyState>
      )}
    </div>
  );
}
