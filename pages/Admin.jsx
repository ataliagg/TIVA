import { useEffect, useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { workers } from '../data/workers';
import Icon from '../components/common/Icon';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import './Admin.css';
export default function Admin() {
  const { setRole, requests, reviews, notify } = useDemo();
  const [tab, setTab] = useState('Usuarios');
  const [query, setQuery] = useState('');
  const [suspended, setSuspended] = useState([]);
  const [hidden, setHidden] = useState([]);
  const [pending, setPending] = useState(null);
  useEffect(() => {
    setRole('admin');
  }, [setRole]);
  const filtered = workers.filter((worker) =>
    worker.name.toLowerCase().includes(query.toLowerCase()),
  );
  function confirm() {
    if (pending.kind === 'user')
      setSuspended((items) =>
        items.includes(pending.id)
          ? items.filter((id) => id !== pending.id)
          : [...items, pending.id],
      );
    else
      setHidden((items) =>
        items.includes(pending.id)
          ? items.filter((id) => id !== pending.id)
          : [...items, pending.id],
      );
    setPending(null);
    notify('Cambio aplicado a la vista de administración de ejemplo.');
  }
  return (
    <div className="admin-page container page">
      <div className="page-heading">
        <span className="eyebrow">EQUIPO TIVA</span>
        <h1>Cuidemos nuestra comunidad.</h1>
        <p>Vista de administración · Usuarios y moderación de contenido.</p>
      </div>
      <div className="admin-stats">
        {[
          { icon: 'users', title: 'Trabajadores', value: workers.length },
          { icon: 'requests', title: 'Solicitudes', value: requests.length },
          { icon: 'star', title: 'Opiniones', value: reviews.length },
        ].map((item) => (
          <div className="panel" key={item.title}>
            <Icon name={item.icon} />
            <span>
              <strong>{item.value}</strong>
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <div className="tabs">
        {['Usuarios', 'Contenido'].map((item) => (
          <button
            className={`tab ${tab === item ? 'active' : ''}`}
            key={item}
            onClick={() => setTab(item)}
            aria-pressed={tab === item}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === 'Usuarios' ? (
        <section className="panel admin-table-panel">
          <div className="admin-table-heading">
            <h2>Usuarios de ejemplo</h2>
            <label>
              <Icon name="search" size={17} />
              <input
                aria-label="Buscar usuario"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre"
              />
            </label>
          </div>
          <div className="admin-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Zona</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((worker) => (
                  <tr key={worker.id}>
                    <td>
                      <div className="admin-user">
                        <Avatar person={worker} size="small" />
                        <span>
                          <strong>{worker.name}</strong>
                          <small>Trabajador</small>
                        </span>
                      </div>
                    </td>
                    <td>{worker.location}</td>
                    <td>
                      <span
                        className={`tag ${suspended.includes(worker.id) ? 'admin-suspended' : ''}`}
                      >
                        {suspended.includes(worker.id) ? 'Suspendido' : 'Activo'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-small"
                        onClick={() =>
                          setPending({
                            kind: 'user',
                            id: worker.id,
                            title: suspended.includes(worker.id)
                              ? 'Reactivar usuario'
                              : 'Suspender usuario',
                          })
                        }
                      >
                        {suspended.includes(worker.id) ? 'Reactivar' : 'Suspender'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <p className="admin-empty">No se encontraron usuarios con ese nombre.</p>
            )}
          </div>
        </section>
      ) : (
        <section className="admin-content-list">
          {reviews.map((review) => (
            <article
              className={`panel ${hidden.includes(review.id) ? 'admin-hidden' : ''}`}
              key={review.id}
            >
              <div>
                <Avatar person={review} size="small" />
                <strong>{review.name}</strong>
                <span className="tag">{hidden.includes(review.id) ? 'Oculto' : 'Publicado'}</span>
              </div>
              <p>{review.text}</p>
              <button
                className="btn btn-outline btn-small"
                onClick={() =>
                  setPending({
                    kind: 'review',
                    id: review.id,
                    title: hidden.includes(review.id)
                      ? 'Restaurar comentario'
                      : 'Ocultar comentario',
                  })
                }
              >
                {hidden.includes(review.id) ? 'Restaurar comentario' : 'Ocultar comentario'}
              </button>
            </article>
          ))}
        </section>
      )}
      <div className="notice admin-note">
        <Icon name="help" size={17} />
        Estas acciones solo modifican la vista de ejemplo. La gestión real de permisos y contenido
        necesita un backend.
      </div>
      {pending && (
        <Modal title={pending.title} onClose={() => setPending(null)}>
          <p className="muted">
            Vas a cambiar el estado de este elemento en la demostración. Podés revertirlo desde el
            mismo listado.
          </p>
          <div className="form-actions admin-modal-actions">
            <button className="btn btn-outline" onClick={() => setPending(null)}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={confirm}>
              Confirmar cambio
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
