import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { workers } from '../data/workers';
import { getService } from '../data/services';
import FilterPanel from '../components/search/FilterPanel';
import WorkerCard from '../components/workers/WorkerCard';
import Icon from '../components/common/Icon';
import EmptyState from '../components/common/EmptyState';
import './SearchWorkers.css';

export default function SearchWorkers() {
  const [params, setParams] = useSearchParams();
  const filters = Object.fromEntries(params);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState(filters.q || '');
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  function changeFilter(name, value) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      value ? next.set(name, value) : next.delete(name);
      return next;
    });
  }
  function reset() {
    setParams({});
    setSearch('');
  }
  const filtered = workers
    .filter(
      (worker) =>
        (!filters.servicio || worker.service === filters.servicio) &&
        (!filters.zona || worker.zones.includes(filters.zona)) &&
        (!filters.q ||
          normalize(
            `${worker.name} ${getService(worker.service).name} ${getService(worker.service).profession}`,
          ).includes(normalize(filters.q))) &&
        (!filters.precio || worker.price <= Number(filters.precio)) &&
        (!filters.valoracion || worker.rating >= Number(filters.valoracion)) &&
        (filters.disponible !== 'si' || worker.available) &&
        (filters.urgente !== 'si' || (worker.urgent && worker.available)),
    )
    .sort((a, b) =>
      filters.orden === 'precio'
        ? a.price - b.price
        : filters.orden === 'opiniones'
          ? b.reviewCount - a.reviewCount
          : b.rating - a.rating,
    );
  return (
    <div className="search-page container page">
      <Link to="/" className="back-link">
        <Icon name="back" size={16} /> Inicio
      </Link>
      <div className="page-heading">
        <h1>Encontrá a quien te dé una mano.</h1>
        <p>Profesionales de tu zona, con toda la información para elegir.</p>
      </div>
      <form
        className="search-page-form"
        onSubmit={(event) => {
          event.preventDefault();
          changeFilter('q', search);
        }}
      >
        <Icon name="search" />
        <input
          aria-label="Buscar servicio o profesional"
          placeholder="Buscá un servicio o profesional"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>
      <button
        className="btn btn-outline search-mobile-filter"
        onClick={() => setShowFilters(!showFilters)}
        aria-expanded={showFilters}
      >
        <Icon name="filter" size={17} />
        {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>
      <div className="search-layout">
        <div className={`search-filters ${showFilters ? 'search-filters-visible' : ''}`}>
          <FilterPanel filters={filters} onChange={changeFilter} onReset={reset} />
        </div>
        <div className="search-results">
          <div className="search-area">
            <Icon name="pin" size={24} />
            <div>
              <strong>{filters.zona || 'Tucumán y alrededores'}</strong>
              <span>Personas que trabajan en tu zona</span>
            </div>
            <span className="search-area-label">Comunidad local</span>
          </div>
          <div className="search-results-heading">
            <div>
              <h2>
                {getService(filters.servicio)?.name ||
                  (filters.q ? `Resultados para “${filters.q}”` : 'Todos los profesionales')}
              </h2>
              <p aria-live="polite">
                {filtered.length}{' '}
                {filtered.length === 1 ? 'profesional encontrado' : 'profesionales encontrados'}
              </p>
            </div>
            <label>
              <span>Ordenar por</span>
              <select
                aria-label="Ordenar profesionales"
                value={filters.orden || 'valoracion'}
                onChange={(event) => changeFilter('orden', event.target.value)}
              >
                <option value="valoracion">Mejor calificación</option>
                <option value="precio">Menor precio</option>
                <option value="opiniones">Más opiniones</option>
              </select>
            </label>
          </div>
          <div className="search-results-list">
            {filtered.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} horizontal />
            ))}
          </div>
          {!filtered.length && (
            <EmptyState
              title="No encontramos profesionales con estos filtros"
              description="Probá con otra zona, servicio o disponibilidad para ver más opciones."
            >
              <button className="btn btn-primary" onClick={reset}>
                Limpiar filtros
              </button>
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
