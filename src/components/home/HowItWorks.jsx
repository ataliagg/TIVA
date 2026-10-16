import Icon from '../common/Icon';
import './HowItWorks.css';
const steps = [
  {
    icon: 'search',
    title: 'Buscá lo que necesitás',
    text: 'Elegí el servicio y encontrá trabajadores en tu zona.',
  },
  {
    icon: 'users',
    title: 'Conocé y compará',
    text: 'Mirá sus perfiles, trabajos anteriores y opiniones.',
  },
  {
    icon: 'chat',
    title: 'Coordiná el trabajo',
    text: 'Contá qué necesitás y solicitá un presupuesto.',
  },
  {
    icon: 'star',
    title: 'Compartí tu experiencia',
    text: 'Tu calificación ayuda a otros vecinos a elegir.',
  },
];
export default function HowItWorks() {
  return (
    <section className="how-it-works section">
      <div className="how-heading">
        <span className="eyebrow">ASÍ DE SIMPLE</span>
        <h2>De un pendiente a un problema resuelto.</h2>
        <p>Vos contás qué necesitás. TIVA te acerca a quien puede ayudarte.</p>
      </div>
      <div className="how-steps">
        {steps.map((step, index) => (
          <div className="how-step" key={step.title}>
            <span className="how-step-icon">
              <Icon name={step.icon} size={25} />
              <span>{index + 1}</span>
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
