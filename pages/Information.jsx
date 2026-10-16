import { Link, useParams } from 'react-router-dom';
import HowItWorks from '../components/home/HowItWorks';
import TrustSection from '../components/home/TrustSection';
import WorkerCTA from '../components/home/WorkerCTA';
import FAQSection from '../components/home/FAQSection';
import Icon from '../components/common/Icon';
import './Information.css';
export default function Information({ type }) {
  const { kind } = useParams();
  if (type === 'legal')
    return (
      <div className="information-page legal-page container page">
        <div className="page-heading">
          <span className="eyebrow">PROYECTO ACADÉMICO · BORRADOR</span>
          <h1>{kind === 'privacidad' ? 'Privacidad' : 'Términos y condiciones'}</h1>
        </div>
        <article className="panel legal-content">
          <h2>Acerca de esta demostración</h2>
          <p>
            TIVA es un prototipo visual de una plataforma de servicios domésticos y barriales. Los
            usuarios, solicitudes, precios, mensajes y opiniones mostrados son ficticios y se usan
            para presentar la interfaz.
          </p>
          <h2>Información y datos</h2>
          <p>
            Los formularios no crean cuentas reales ni envían información a un servidor. Los cambios
            se conservan en la memoria de esta página y desaparecen al recargar. No ingreses
            documentos, contraseñas ni información personal real.
          </p>
          <h2>Servicios y presupuestos</h2>
          <p>
            Las acciones de solicitar, aceptar, rechazar, presupuestar y calificar son simulaciones.
            No contratan servicios ni generan transacciones. La primera versión prevista no procesa
            pagos y no verifica títulos o matrículas profesionales.
          </p>
          <h2>Antes de una publicación real</h2>
          <p>
            Los términos y la política de privacidad definitivos deberán definirse de acuerdo con el
            funcionamiento real del producto. Este texto describe únicamente el prototipo académico.
          </p>
          <Link to="/registro" className="btn btn-outline">
            Volver al registro
          </Link>
        </article>
      </div>
    );
  const worker = type === 'worker';
  const help = type === 'help';
  return (
    <div className="information-page container page">
      <div className="information-intro">
        <span className="eyebrow">
          {help
            ? 'ESTAMOS CERCA'
            : worker
              ? 'HACÉ CRECER TU TRABAJO'
              : 'MENOS VUELTAS, MÁS SOLUCIONES'}
        </span>
        <h1>
          {help
            ? 'Una mano, también con tus dudas.'
            : worker
              ? 'Tu próximo cliente puede ser tu vecino.'
              : 'Conectá. Coordiná. Resolvé.'}
        </h1>
        <p>
          {help
            ? 'Encontrá respuestas para usar TIVA con tranquilidad.'
            : worker
              ? 'Un lugar para mostrar lo que hacés, recibir solicitudes y construir tu reputación.'
              : 'Encontrar ayuda para tu casa puede ser mucho más simple.'}
        </p>
        {!help && (
          <Link className="btn btn-primary" to={worker ? '/registro?tipo=trabajador' : '/buscar'}>
            {worker ? 'Quiero ofrecer mis servicios' : 'Encontrar un profesional'}
          </Link>
        )}
      </div>
      {worker ? (
        <div className="information-worker-steps">
          {[
            {
              icon: 'user',
              title: 'Creá tu perfil',
              text: 'Contá tu experiencia, tus servicios y dónde trabajás.',
            },
            {
              icon: 'image',
              title: 'Mostrá tus trabajos',
              text: 'Sumá fotos que permitan conocer lo que sabés hacer.',
            },
            {
              icon: 'requests',
              title: 'Recibí solicitudes',
              text: 'Revisá cada pedido y enviá tu presupuesto.',
            },
            {
              icon: 'star',
              title: 'Construí tu reputación',
              text: 'Cada trabajo finalizado puede sumar una recomendación.',
            },
          ].map((item) => (
            <article className="panel" key={item.title}>
              <Icon name={item.icon} size={28} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      ) : (
        !help && <HowItWorks />
      )}
      {!help && <TrustSection />}
      <FAQSection all />
      {!worker && !help && <WorkerCTA />}
    </div>
  );
}
