import { Link } from 'react-router-dom';
import './Logo.css';
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="TIVA, inicio">
      <span className="logo-symbol">t</span>
      <span>
        tiva<span className="logo-dot">.</span>
      </span>
    </Link>
  );
}
