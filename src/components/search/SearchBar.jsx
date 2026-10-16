import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { locations } from '../../data/services';
import Icon from '../common/Icon';
import './SearchBar.css';
export default function SearchBar({ compact = false, defaultQuery = '' }) {
  const { location, setLocation } = useDemo();
  const [query, setQuery] = useState(defaultQuery);
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    const params = new URLSearchParams({ q: query, zona: location });
    navigate(`/buscar?${params}`);
  }
  return (
    <form className={`search-bar ${compact ? 'search-bar-compact' : ''}`} onSubmit={submit}>
      <div className="search-bar-service">
        <Icon name="search" size={22} />
        <label>
          <span className="sr-only">Servicio o profesional</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="¿Qué servicio necesitás?"
          />
        </label>
      </div>
      <div className="search-bar-location">
        <Icon name="pin" size={20} />
        <label>
          <span className="sr-only">Zona de búsqueda</span>
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            {locations.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn btn-primary" type="submit">
        <Icon name="search" size={18} />
        <span>Buscar</span>
      </button>
    </form>
  );
}
