import { useEffect, useRef, useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import Avatar from '../common/Avatar';
import Icon from '../common/Icon';
import './Chat.css';
export default function Chat({ request, person, worker = false }) {
  const { messages, setMessages } = useDemo();
  const [draft, setDraft] = useState('');
  const end = useRef(null);
  const items = messages[request.id] || [];
  const sender = worker ? 'worker' : 'client';
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest' });
  }, [items.length, request.id]);
  function send(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages((previous) => ({
      ...previous,
      [request.id]: [
        ...(previous[request.id] || []),
        {
          id: Date.now(),
          sender,
          text: draft.trim(),
          time: new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(
            new Date(),
          ),
        },
      ],
    }));
    setDraft('');
  }
  return (
    <section className="chat">
      <header className="chat-header">
        <Avatar person={person} size="small" />
        <div>
          <h2>{person.name}</h2>
          <p>
            Solicitud {request.id} · {request.title}
          </p>
        </div>
        <Icon name="chat" size={20} />
      </header>
      <div
        className="chat-body"
        role="log"
        aria-label="Mensajes de la conversación"
        aria-live="polite"
      >
        <span className="chat-date">Conversación de ejemplo</span>
        {items.length === 0 && (
          <p className="chat-empty">
            Este es el comienzo de la conversación. Podés escribir para coordinar los detalles del
            trabajo.
          </p>
        )}
        {items.map((item) => (
          <div
            className={`chat-message ${item.sender === sender ? 'chat-message-own' : ''}`}
            key={item.id}
          >
            <p>{item.text}</p>
            <span>
              {item.time}
              {item.sender === sender && <Icon name="check" size={13} />}
            </span>
          </div>
        ))}
        <div ref={end} />
      </div>
      <div className="chat-notice">
        <Icon name="lock" size={12} /> Demo: los mensajes no se envían a otras personas.
      </div>
      <form className="chat-compose" onSubmit={send}>
        <input
          aria-label="Escribí un mensaje"
          value={draft}
          maxLength={1000}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Escribí tu mensaje..."
        />
        <button
          className="btn btn-primary"
          aria-label="Enviar mensaje de ejemplo"
          disabled={!draft.trim()}
        >
          <Icon name="send" size={19} />
        </button>
      </form>
    </section>
  );
}
