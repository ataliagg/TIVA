import { useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import Icon from './Icon';
import './Toast.css';
export default function Toast() {
  const { toast, setToast } = useDemo();
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 5500);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);
  return (
    <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status" aria-live="polite">
      {toast && (
        <>
          <Icon name="success" />
          <span>{toast}</span>
          <button onClick={() => setToast('')} aria-label="Cerrar aviso">
            <Icon name="close" size={17} />
          </button>
        </>
      )}
    </div>
  );
}
