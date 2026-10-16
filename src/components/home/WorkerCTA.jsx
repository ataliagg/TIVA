import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import './WorkerCTA.css';
export default function WorkerCTA() {
  return (
    <section className="worker-cta">
      <div className="worker-cta-symbol">
        <Icon name="briefcase" size={36} />
      </div>
      <div>
        <span className="eyebrow">TU OFICIO TIENE LUGAR ACÁ</span>
        <h2>Hay vecinos que necesitan lo que sabés hacer.</h2>
        <p>Mostrá tu trabajo, recibí solicitudes y hacé crecer tu comunidad.</p>
      </div>
      <Link className="btn" to="/registro?tipo=trabajador">
        Quiero ofrecer mis servicios
      </Link>
    </section>
  );
}
