import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { locations, getService } from '../../data/services';
import Icon from '../common/Icon';
import Avatar from '../common/Avatar';
import ImageUploader from '../common/ImageUploader';
import './RequestForm.css';
export default function RequestForm({ worker }) {
  const { location, setRequests, notify, setRole } = useDemo();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [urgent, setUrgent] = useState(false);
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    if (!description.trim()) return;
    const values = new FormData(event.currentTarget);
    const id = `TV-${Date.now().toString().slice(-6)}`;
    setRequests((requests) => [
      {
        id,
        workerId: worker.id,
        client: 'Julieta García',
        service: worker.service,
        title: description.trim().slice(0, 65),
        description: description.trim(),
        location: values.get('location'),
        address: values.get('address'),
        availability: values.get('availability'),
        status: 'Pendiente',
        date: 'Ahora',
        urgency: urgent ? 'Urgente' : 'Normal',
        owner: 'client',
        photos: images.map((image) => image.src),
        history: ['Solicitud enviada'],
      },
      ...requests,
    ]);
    setRole('client');
    notify('Solicitud agregada a la demo. No se envió a un trabajador real.');
    navigate(`/cliente/solicitudes/${id}`);
  }
  return (
    <form className="request-form form-stack" onSubmit={submit}>
      <div className="request-selected-worker">
        <Avatar person={worker} />
        <div>
          <span>Tu solicitud para</span>
          <strong>{worker.name}</strong>
          <p>{getService(worker.service).profession}</p>
        </div>
        {worker.identity && <Icon name="verified" />}
      </div>
      <label className="field">
        Servicio solicitado
        <input value={getService(worker.service).name} readOnly />
      </label>
      <label className="field">
        Contanos qué necesitás <span className="sr-only">obligatorio</span>
        <textarea
          name="description"
          required
          minLength={10}
          maxLength={500}
          placeholder="Por ejemplo: la canilla de la cocina pierde agua cuando la cierro..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <small className="character-count">{description.length}/500</small>
      </label>
      <div className="request-photos">
        <h3>
          Una foto puede ayudar <span>(opcional)</span>
        </h3>
        <p>Mostrale al profesional qué está pasando.</p>
        <ImageUploader images={images} onChange={setImages} />
      </div>
      <div className="field-grid">
        <label className="field">
          Zona
          <select name="location" defaultValue={location}>
            {locations.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Disponibilidad horaria
          <select name="availability">
            <option>Mañana · 8:00 a 12:00</option>
            <option>Tarde · 14:00 a 18:00</option>
            <option>A coordinar</option>
          </select>
        </label>
      </div>
      <label className="field">
        Dirección o referencia de la zona
        <input name="address" required minLength={4} placeholder="Ej.: zona Plaza Urquiza" />
        <small>No ingreses datos personales reales en esta demo.</small>
      </label>
      <label className="request-urgency">
        <span>
          <Icon name="zap" size={24} />
          <span>
            <strong>Lo necesito con urgencia</strong>
            <small>El trabajador podrá ver que tu pedido es urgente.</small>
          </span>
        </span>
        <input
          type="checkbox"
          checked={urgent}
          onChange={(event) => setUrgent(event.target.checked)}
        />
      </label>
      <div className="notice">
        <Icon name="help" size={18} />
        <span>
          Le enviás la solicitud únicamente a {worker.name}. El presupuesto final se acuerda antes
          de realizar el trabajo.
        </span>
      </div>
      <div className="form-actions">
        <Link className="btn btn-outline" to={`/profesionales/${worker.id}`}>
          Cancelar
        </Link>
        <button className="btn btn-primary" type="submit" disabled={!worker.available}>
          <Icon name="send" size={18} /> Enviar solicitud
        </button>
      </div>
    </form>
  );
}
