import { services, locations, money } from '../../data/services';
import Icon from '../common/Icon';
import './FilterPanel.css';
export default function FilterPanel({ filters, onChange, onReset }) {
  return (
    <aside className="filter-panel panel">
      <div className="filter-panel-title">
        <h3>
          <Icon name="filter" size={18} /> Filtros
        </h3>
        <button className="link-button" onClick={onReset}>
          Limpiar
        </button>
      </div>
      <label className="field">
        Servicio
        <select
          value={filters.servicio || ''}
          onChange={(event) => onChange('servicio', event.target.value)}
        >
          <option value="">Todos los servicios</option>
          {services.map((service) => (
            <option value={service.id} key={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        Zona de trabajo
        <select
          value={filters.zona || ''}
          onChange={(event) => onChange('zona', event.target.value)}
        >
          <option value="">Todo Tucumán</option>
          {locations.map((place) => (
            <option key={place}>{place}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Precio máximo de visita
        <span className="filter-price">
          {filters.precio ? money(Number(filters.precio)) : 'Sin límite'}
        </span>
        <input
          type="range"
          min="5000"
          max="30000"
          step="1000"
          value={filters.precio || 30000}
          onChange={(event) =>
            onChange('precio', event.target.value === '30000' ? '' : event.target.value)
          }
        />
        <span className="filter-range-labels">
          <span>$5.000</span>
          <span>$30.000+</span>
        </span>
      </label>
      <label className="field">
        Calificación mínima
        <select
          value={filters.valoracion || ''}
          onChange={(event) => onChange('valoracion', event.target.value)}
        >
          <option value="">Todas las calificaciones</option>
          <option value="4">4 estrellas o más</option>
          <option value="4.8">4,8 estrellas o más</option>
          <option value="5">5 estrellas</option>
        </select>
      </label>
      <div className="filter-checks">
        <label className="check-label">
          <input
            type="checkbox"
            checked={filters.disponible === 'si'}
            onChange={(event) => onChange('disponible', event.target.checked ? 'si' : '')}
          />
          Disponible esta semana
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={filters.urgente === 'si'}
            onChange={(event) => onChange('urgente', event.target.checked ? 'si' : '')}
          />
          Recibe pedidos urgentes
        </label>
      </div>
      <p className="filter-footnote">
        <Icon name="help" size={15} /> Los precios son orientativos. Acordá el presupuesto final con
        el trabajador.
      </p>
    </aside>
  );
}
