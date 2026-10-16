import { useState } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { workers } from '../data/workers';
import { getService, money } from '../data/services';
import RequestStatus from '../components/requests/RequestStatus';
import Icon from '../components/common/Icon';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import './RequestDetail.css';
export default function RequestDetail() {
  const { id } = useParams();
  const { worker, base } = useOutletContext();
  const { requests, updateRequest, notify } = useDemo();
  const [modal, setModal] = useState('');
  const request = requests.find(
    (item) => item.id === id && (worker ? item.workerId === 'martin' : item.owner === 'client'),
  );
  if (!request)
    return (
      <EmptyState
        title="No encontramos la solicitud"
        description="Revisá tus solicitudes para continuar."
      >
        <Link className="btn btn-primary" to={`${base}/solicitudes`}>
          Ver solicitudes
        </Link>
      </EmptyState>
    );
  const person = workers.find((item) => item.id === request.workerId);
  function update(status, extra = {}) {
    updateRequest(id, {
      status,
      history: [
        ...request.history,
        status === 'Confirmada'
          ? 'Visita confirmada'
          : status === 'Finalizada'
            ? 'Trabajo finalizado'
            : `Solicitud ${status.toLowerCase()}`,
      ],
      ...extra,
    });
    setModal('');
    notify('Estado actualizado en la demo.');
  }
  return (
    <div className="request-detail">
      <Link className="back-link" to={`${base}/solicitudes`}>
        <Icon name="back" size={16} />
        Volver a solicitudes
      </Link>
      <div className="request-detail-heading">
        <div>
          <span className="eyebrow">SOLICITUD {id}</span>
          <h1>{getService(request.service).name}</h1>
        </div>
        <RequestStatus status={request.status} />
      </div>
      <section className="panel">
        <div className="request-detail-person">
          <Avatar person={worker ? { name: request.client } : person} />
          <div>
            <span>{worker ? 'Solicitado por' : 'Tu profesional'}</span>
            <strong>{worker ? request.client : person.name}</strong>
            <p>{request.location}</p>
          </div>
          {!worker && (
            <Link className="text-link" to={`/profesionales/${person.id}`}>
              Ver perfil
            </Link>
          )}
        </div>
        <div className="divider" />
        <h2>{request.title}</h2>
        <p className="request-detail-description">{request.description}</p>
        <div className="request-detail-facts">
          <div>
            <Icon name="pin" />
            <span>
              Ubicación<strong>{request.location}</strong>
              {request.address && <small>{request.address}</small>}
            </span>
          </div>
          <div>
            <Icon name="clock" />
            <span>
              Solicitud creada<strong>{request.date}</strong>
            </span>
          </div>
          <div>
            <Icon name="zap" />
            <span>
              Urgencia<strong>{request.urgency}</strong>
            </span>
          </div>
          <div>
            <Icon name="calendar" />
            <span>
              Horario preferido<strong>{request.availability || 'A coordinar'}</strong>
            </span>
          </div>
        </div>
        {request.photos.length > 0 && (
          <div className="request-detail-photos">
            {request.photos.map((photo, index) => (
              <button
                key={photo}
                onClick={() => setModal(`photo:${index}`)}
                aria-label={`Ampliar foto adjunta ${index + 1}`}
              >
                <img src={photo} alt={`Foto del problema ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
        {request.budget && (
          <div className="request-budget">
            <div>
              <Icon name="document" size={22} />
              <span>
                Presupuesto orientativo<strong>{money(request.budget)}</strong>
              </span>
            </div>
            <p>
              {request.budgetDetail ||
                'Incluye revisión y mano de obra. Los materiales se acuerdan por separado.'}
            </p>
          </div>
        )}
      </section>
      <section className="panel">
        <h2>Estado de tu solicitud</h2>
        <ol className="request-timeline">
          {request.history.map((step, index) => (
            <li key={`${step}-${index}`}>
              <span>
                <Icon name="check" size={14} />
              </span>
              <strong>{step}</strong>
              <small>
                {index === request.history.length - 1 ? 'Última actualización' : 'Completado'}
              </small>
            </li>
          ))}
        </ol>
      </section>
      <div className="request-detail-buttons">
        {!['Cancelada', 'Rechazada'].includes(request.status) && (
          <Link className="btn btn-outline" to={`${base}/mensajes?solicitud=${id}`}>
            <Icon name="chat" size={18} />
            Abrir conversación
          </Link>
        )}
        {worker && ['Pendiente', 'Presupuestada'].includes(request.status) && (
          <>
            <button className="btn btn-outline" onClick={() => setModal('reject')}>
              Rechazar
            </button>
            <button className="btn btn-outline" onClick={() => setModal('budget')}>
              Enviar presupuesto
            </button>
            <button className="btn btn-primary" onClick={() => update('Confirmada')}>
              Aceptar solicitud
            </button>
          </>
        )}
        {!worker && request.status === 'Presupuestada' && (
          <button className="btn btn-primary" onClick={() => update('Confirmada')}>
            Aceptar presupuesto
          </button>
        )}
        {worker && request.status === 'Confirmada' && (
          <button className="btn btn-primary" onClick={() => setModal('finish')}>
            Marcar como finalizada
          </button>
        )}
        {!worker && ['Pendiente', 'Presupuestada', 'Confirmada'].includes(request.status) && (
          <button className="btn btn-danger" onClick={() => setModal('cancel')}>
            Cancelar solicitud
          </button>
        )}
        {!worker && request.status === 'Finalizada' && !request.reviewed && (
          <Link className="btn btn-primary" to={`/cliente/calificar/${id}`}>
            <Icon name="star" size={18} />
            Calificar servicio
          </Link>
        )}
        {request.reviewed && (
          <span className="tag">
            <Icon name="check" size={15} />
            Ya calificaste este servicio
          </span>
        )}
      </div>
      {modal && (
        <Modal
          title={
            modal === 'budget'
              ? 'Enviar un presupuesto'
              : modal.startsWith('photo:')
                ? 'Foto del problema'
                : modal === 'finish'
                  ? '¿El trabajo está finalizado?'
                  : modal === 'reject'
                    ? '¿Rechazar esta solicitud?'
                    : '¿Cancelar esta solicitud?'
          }
          onClose={() => setModal('')}
        >
          {modal === 'budget' ? (
            <form
              className="form-stack"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                update('Presupuestada', {
                  budget: Number(form.get('amount')),
                  budgetDetail: form.get('detail'),
                });
              }}
            >
              <label className="field">
                Monto estimado (ARS)
                <input type="number" name="amount" required min="1" step="1" placeholder="18000" />
              </label>
              <label className="field">
                ¿Qué incluye?
                <textarea
                  name="detail"
                  required
                  minLength={10}
                  placeholder="Detallá mano de obra, materiales y condiciones."
                />
              </label>
              <p className="notice">Este presupuesto se guarda únicamente en la maqueta.</p>
              <button className="btn btn-primary">Enviar presupuesto</button>
            </form>
          ) : modal.startsWith('photo:') ? (
            <img
              className="request-full-photo"
              src={request.photos[Number(modal.split(':')[1])]}
              alt="Foto ampliada del problema"
            />
          ) : (
            <>
              <p className="muted">
                {modal === 'finish'
                  ? 'El cliente podrá dejar su calificación una vez finalizado el servicio.'
                  : 'El estado quedará actualizado en esta demostración.'}
              </p>
              <div className="form-actions request-modal-actions">
                <button className="btn btn-outline" onClick={() => setModal('')}>
                  Volver
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    update(
                      modal === 'finish'
                        ? 'Finalizada'
                        : modal === 'reject'
                          ? 'Rechazada'
                          : 'Cancelada',
                    )
                  }
                >
                  Confirmar
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
