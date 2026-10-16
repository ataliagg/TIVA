import { useSearchParams, useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { workers } from '../data/workers';
import Chat from '../components/messages/Chat';
import Avatar from '../components/common/Avatar';
import EmptyState from '../components/common/EmptyState';
import './Messages.css';
export default function Messages() {
  const { worker } = useOutletContext();
  const { requests, messages } = useDemo();
  const [params, setParams] = useSearchParams();
  const items = requests.filter((request) =>
    worker ? request.workerId === 'martin' : request.owner === 'client',
  );
  const selected = items.find((item) => item.id === params.get('solicitud')) || items[0];
  const personFor = (request) =>
    worker ? { name: request.client } : workers.find((person) => person.id === request.workerId);
  return (
    <div className="messages-page">
      <div className="page-heading">
        <h1>Mensajes</h1>
        <p>Las buenas soluciones empiezan con una conversación.</p>
      </div>
      {selected ? (
        <div className="messages-layout">
          <aside className="conversation-list" aria-label="Conversaciones">
            <h2>Tus conversaciones</h2>
            {items.map((request) => {
              const person = personFor(request);
              const last = messages[request.id]?.at(-1);
              return (
                <button
                  key={request.id}
                  className={selected.id === request.id ? 'active' : ''}
                  onClick={() => setParams({ solicitud: request.id })}
                >
                  <Avatar person={person} size="small" />
                  <span>
                    <strong>{person.name}</strong>
                    <span>{last?.text || request.title}</span>
                    <small>{request.id}</small>
                  </span>
                </button>
              );
            })}
          </aside>
          <Chat key={selected.id} request={selected} person={personFor(selected)} worker={worker} />
        </div>
      ) : (
        <EmptyState
          icon="chat"
          title="Todavía no hay conversaciones"
          description="Cuando envíes o recibas una solicitud, vas a poder conversar desde acá."
        />
      )}
    </div>
  );
}
