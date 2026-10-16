import { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { services, money } from '../data/services';
import Icon from '../components/common/Icon';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import './WorkerServices.css';
export default function WorkerServices() {
  const { profiles, setProfiles, notify } = useDemo();
  const [adding, setAdding] = useState(false);
  const selected = profiles.worker.serviceIds;
  function toggle(id) {
    setProfiles((previous) => ({
      ...previous,
      worker: {
        ...previous.worker,
        serviceIds: selected.includes(id)
          ? selected.filter((item) => item !== id)
          : [...selected, id],
      },
    }));
    notify('Servicios actualizados en la demo.');
  }
  return (
    <div className="worker-services-page">
      <div className="section-heading">
        <div className="page-heading">
          <h1>Mis servicios</h1>
          <p>Tu oficio, cada vez más cerca de tus vecinos.</p>
        </div>
        <button className="btn btn-primary btn-small" onClick={() => setAdding(true)}>
          <Icon name="plus" size={17} />
          Agregar
        </button>
      </div>
      <div className="worker-services-grid">
        {services
          .filter((service) => selected.includes(service.id))
          .map((service) => (
            <article className="panel" key={service.id}>
              <span className={`service-card-icon service-color-${service.color}`}>
                <Icon name={service.icon} size={30} />
              </span>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <div>
                <span>
                  Visita de referencia<strong>{money(Number(profiles.worker.price))}</strong>
                </span>
                <button
                  className="icon-btn"
                  aria-label={`Quitar ${service.name} de mis servicios`}
                  onClick={() => toggle(service.id)}
                >
                  <Icon name="trash" size={17} />
                </button>
              </div>
            </article>
          ))}
      </div>
      {!selected.length && (
        <EmptyState
          icon="briefcase"
          title="Dale un lugar a tu oficio"
          description="Agregá al menos un servicio para completar tu perfil."
        >
          <button className="btn btn-primary" onClick={() => setAdding(true)}>
            Agregar un servicio
          </button>
        </EmptyState>
      )}
      {adding && (
        <Modal title="Agregar servicios" onClose={() => setAdding(false)}>
          <div className="worker-services-options">
            {services.map((service) => (
              <button
                key={service.id}
                className={selected.includes(service.id) ? 'selected' : ''}
                onClick={() => toggle(service.id)}
                aria-pressed={selected.includes(service.id)}
              >
                <Icon name={service.icon} />
                <span>{service.name}</span>
                <Icon name={selected.includes(service.id) ? 'check' : 'plus'} size={17} />
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-wide" onClick={() => setAdding(false)}>
            Listo
          </button>
        </Modal>
      )}
    </div>
  );
}
