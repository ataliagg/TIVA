import Icon from '../common/Icon';
import './FAQSection.css';
export const faqs = [
  [
    '¿Cómo encuentro a un trabajador?',
    'Buscá el servicio que necesitás, elegí tu zona y compará perfiles. Podés filtrar por disponibilidad, precio de referencia y calificación. Cuando encuentres a la persona indicada, solicitale un presupuesto.',
  ],
  [
    '¿Cuánto cuesta pedir un presupuesto?',
    'Podés explorar perfiles y solicitar un presupuesto. El trabajador te indicará el costo del servicio y si la visita tiene un valor. Los precios publicados son orientativos y pueden variar según el trabajo.',
  ],
  [
    '¿Puedo adjuntar fotos del problema?',
    'Sí. En la solicitud podés agregar hasta 3 fotos junto con una descripción y el nivel de urgencia. Esto ayuda al trabajador a entender lo que necesitás.',
  ],
  [
    '¿Cómo se coordina el pago?',
    'TIVA no procesa pagos en esta primera versión. El precio final y la forma de pago se acuerdan directamente con el trabajador.',
  ],
  [
    '¿Qué significa la identidad verificada?',
    'Es un indicador previsto para identificar perfiles cuyos datos de identidad hayan sido revisados. No equivale a verificar títulos o matrículas ni garantiza el resultado del servicio. En este prototipo todos los perfiles son de ejemplo.',
  ],
  [
    '¿Cómo puedo ofrecer mis servicios?',
    'Elegí una cuenta de trabajador, completá tu perfil, los servicios que ofrecés, tus zonas, horarios y fotos de trabajos anteriores. Así las personas podrán conocer tu trabajo y enviarte solicitudes.',
  ],
];
export default function FAQSection({ all = false }) {
  return (
    <section className="section faq-section">
      <div className="faq-heading">
        <span className="eyebrow">ESTAMOS PARA AYUDARTE</span>
        <h2>
          Antes de empezar, <br />
          despejá tus dudas.
        </h2>
        <p>
          Lo que necesitás saber para <br />
          sentirte en confianza.
        </p>
      </div>
      <div className="faq-items">
        {faqs.slice(0, all ? undefined : 4).map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Icon name="plus" size={18} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
