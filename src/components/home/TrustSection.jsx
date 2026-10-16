import Icon from '../common/Icon';
import './TrustSection.css';
const items = [
  {
    icon: 'shield',
    title: 'Sabé a quién estás eligiendo',
    text: 'Perfiles con información de identidad y experiencia.',
  },
  {
    icon: 'star',
    title: 'La experiencia de tus vecinos',
    text: 'Calificaciones y comentarios de servicios realizados.',
  },
  {
    icon: 'image',
    title: 'El trabajo habla por sí solo',
    text: 'Fotos de trabajos anteriores para decidir con confianza.',
  },
];
export default function TrustSection() {
  return (
    <section className="trust-section">
      {items.map((item) => (
        <div key={item.title}>
          <span>
            <Icon name={item.icon} size={24} />
          </span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
