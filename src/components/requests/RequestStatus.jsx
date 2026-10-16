import Icon from '../common/Icon';
import './RequestStatus.css';
export default function RequestStatus({ status }) {
  const styles = {
    Pendiente: ['pending', 'clock'],
    Confirmada: ['confirmed', 'success'],
    Finalizada: ['finished', 'check'],
    Cancelada: ['cancelled', 'close'],
    Rechazada: ['cancelled', 'close'],
    Presupuestada: ['quoted', 'document'],
  };
  const [className, icon] = styles[status] || styles.Pendiente;
  return (
    <span className={`request-status status-${className}`}>
      <Icon name={icon} size={14} />
      {status}
    </span>
  );
}
