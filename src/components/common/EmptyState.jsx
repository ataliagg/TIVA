import Icon from './Icon';
import './EmptyState.css';
export default function EmptyState({ title, description, icon = 'search', children }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <Icon name={icon} size={32} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
