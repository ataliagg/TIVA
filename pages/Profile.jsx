import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { services, locations } from '../data/services';
import Icon from '../components/common/Icon';
import Avatar from '../components/common/Avatar';
import ImageUploader from '../components/common/ImageUploader';
import './Profile.css';
export default function Profile() {
  const { worker } = useOutletContext();
  const key = worker ? 'worker' : 'client';
  const { profiles, setProfiles, notify } = useDemo();
  const [profile, setProfile] = useState(profiles[key]);
  const [error, setError] = useState('');
  const change = (field, value) => setProfile((previous) => ({ ...previous, [field]: value }));
  function toggle(field, value) {
    change(
      field,
      profile[field].includes(value)
        ? profile[field].filter((item) => item !== value)
        : [...profile[field], value],
    );
  }
  function save(event) {
    event.preventDefault();
    if (worker && (!profile.serviceIds.length || !profile.zones.length)) {
      setError('Elegí al menos un servicio y una zona de trabajo.');
      return;
    }
    setError('');
    setProfiles((previous) => ({ ...previous, [key]: profile }));
    notify('Cambios guardados en esta sesión de ejemplo.');
  }
  return (
    <div className="edit-profile-page">
      <div className="page-heading">
        <h1>{worker ? 'Tu perfil profesional' : 'Mi perfil'}</h1>
        <p>
          {worker ? 'Mostrá quién sos y lo que sabés hacer.' : 'Tu información, siempre a mano.'}
        </p>
      </div>
      <form onSubmit={save} className="form-stack">
        <section className="panel">
          <div className="edit-profile-avatar">
            <Avatar
              person={{
                name: `${profile.firstName} ${profile.lastName}`,
                photo: worker ? '/images/martin.webp' : null,
              }}
              size="large"
            />
            <div>
              <h2>
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="tag">{worker ? 'Trabajador' : 'Cliente'} · Perfil de ejemplo</span>
            </div>
          </div>
          <h3>Información personal</h3>
          <div className="field-grid">
            <label className="field">
              Nombre
              <input
                required
                value={profile.firstName}
                onChange={(event) => change('firstName', event.target.value)}
              />
            </label>
            <label className="field">
              Apellido
              <input
                required
                value={profile.lastName}
                onChange={(event) => change('lastName', event.target.value)}
              />
            </label>
            <label className="field">
              Correo electrónico
              <input
                type="email"
                required
                value={profile.email}
                onChange={(event) => change('email', event.target.value)}
              />
            </label>
            <label className="field">
              Teléfono
              <input
                type="tel"
                required
                value={profile.phone}
                onChange={(event) => change('phone', event.target.value)}
              />
            </label>
          </div>
          <label className="field profile-location-field">
            Ubicación
            <select
              value={profile.location}
              onChange={(event) => change('location', event.target.value)}
            >
              {locations.map((place) => (
                <option key={place}>{place}</option>
              ))}
            </select>
          </label>
        </section>
        {worker && (
          <>
            <section className="panel">
              <h3>Servicios que ofrecés</h3>
              <div className="profile-service-options">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={profile.serviceIds.includes(service.id)}
                    className={profile.serviceIds.includes(service.id) ? 'selected' : ''}
                    onClick={() => toggle('serviceIds', service.id)}
                  >
                    <Icon name={service.icon} size={25} />
                    <span>{service.name}</span>
                    {profile.serviceIds.includes(service.id) && (
                      <Icon name="success" size={15} className="profile-selected-check" />
                    )}
                  </button>
                ))}
              </div>
              <label className="field">
                Presentación
                <textarea
                  value={profile.description}
                  required
                  minLength={20}
                  maxLength={500}
                  onChange={(event) => change('description', event.target.value)}
                  placeholder="Contá sobre tu experiencia y forma de trabajar."
                />
                <small className="character-count">{profile.description.length}/500</small>
              </label>
              <div className="field-grid">
                <label className="field">
                  Años de experiencia
                  <input
                    type="number"
                    min="0"
                    max="70"
                    required
                    value={profile.experience}
                    onChange={(event) => change('experience', event.target.value)}
                  />
                </label>
                <label className="field">
                  Precio de referencia de visita (ARS)
                  <input
                    type="number"
                    min="0"
                    required
                    value={profile.price}
                    onChange={(event) => change('price', event.target.value)}
                  />
                </label>
              </div>
            </section>
            <section className="panel">
              <h3>Zonas y disponibilidad</h3>
              <div className="profile-zone-options">
                {locations.map((place) => (
                  <label className="check-label" key={place}>
                    <input
                      type="checkbox"
                      checked={profile.zones.includes(place)}
                      onChange={() => toggle('zones', place)}
                    />
                    {place}
                  </label>
                ))}
              </div>
              <label className="field">
                Horario de atención
                <select
                  value={profile.availability}
                  onChange={(event) => change('availability', event.target.value)}
                >
                  <option>Lun. a sáb. · 8:00 a 18:00</option>
                  <option>Lun. a vie. · 9:00 a 17:00</option>
                  <option>Solo fines de semana</option>
                  <option>A coordinar</option>
                </select>
              </label>
            </section>
            <section className="panel">
              <h3>Validación de identidad</h3>
              <p className="profile-help-text">
                En la versión final podrás presentar tus datos para una revisión de identidad.
              </p>
              <div className="profile-validation">
                <Icon name="document" />
                <span>Documento de identidad</span>
                <span className="tag">Pendiente</span>
              </div>
              <div className="profile-validation">
                <Icon name="user" />
                <span>Foto de identificación</span>
                <span className="tag">Pendiente</span>
              </div>
              <small className="profile-validation-note">
                No se solicitan documentos reales en esta maqueta.
              </small>
            </section>
            <section className="panel">
              <h3>Fotos de tus trabajos</h3>
              <p className="profile-help-text">Compartí una muestra de lo que sabés hacer.</p>
              <ImageUploader
                max={6}
                images={profile.photos}
                onChange={(images) => change('photos', images)}
              />
            </section>
          </>
        )}
        <p className="notice">
          <Icon name="help" size={17} />
          Los cambios se conservan mientras recorrés la demo y se reinician al recargar.
        </p>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary profile-save">
          <Icon name="check" size={18} />
          {worker ? 'Guardar perfil profesional' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
