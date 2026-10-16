import { useState } from 'react';
import { services } from '../data/services';
import ServiceCard from '../components/services/ServiceCard';
import Icon from '../components/common/Icon';
import EmptyState from '../components/common/EmptyState';
import './Services.css';
export default function Services() {
  const [query, setQuery] = useState('');
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const filtered = services.filter((service) =>
    normalize(service.name + service.description).includes(normalize(query)),
  );
  return (
    <div className="services-page container page">
      <div className="page-heading">
        <span className="eyebrow">UNA SOLUCIÓN PARA CADA PENDIENTE</span>
        <h1>Servicios para tu día a día.</h1>
        <p>Encontrá en tu comunidad a la persona que necesitás.</p>
      </div>
      <div className="services-search">
        <Icon name="search" />
        <input
          aria-label="Buscar una categoría de servicio"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscá un servicio, por ejemplo: plomería"
        />
      </div>
      {filtered.length ? (
        <div className="services-grid">
          {filtered.map((service) => (
            <ServiceCard service={service} detailed key={service.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No encontramos ese servicio"
          description="Probá con otra palabra o explorá todas las categorías."
        >
          <button className="btn btn-primary" onClick={() => setQuery('')}>
            Ver todos los servicios
          </button>
        </EmptyState>
      )}
    </div>
  );
}
