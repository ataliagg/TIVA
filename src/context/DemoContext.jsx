import { createContext, useContext, useState } from 'react';
import { initialRequests } from '../data/requests';
import { reviews as initialReviews } from '../data/workers';

const DemoContext = createContext(null);

// Estado temporal de la maqueta. No hay autenticación ni persistencia real.
export function DemoProvider({ children }) {
  const [role, setRole] = useState('public');
  const [location, setLocation] = useState('San Miguel de Tucumán');
  const [requests, setRequests] = useState(initialRequests);
  const [reviews, setReviews] = useState(initialReviews);
  const [toast, setToast] = useState('');
  const [profiles, setProfiles] = useState({
    client: {
      firstName: 'Julieta',
      lastName: 'García',
      email: 'julieta@ejemplo.com',
      phone: '381 000 0000',
      location: 'San Miguel de Tucumán',
    },
    worker: {
      firstName: 'Martín',
      lastName: 'López',
      email: 'martin@ejemplo.com',
      phone: '381 000 0000',
      location: 'San Miguel de Tucumán',
      description:
        'Soy plomero hace más de 8 años. Trabajo con responsabilidad y atención al detalle para que tu hogar funcione siempre bien.',
      experience: 8,
      price: 12000,
      availability: 'Lun. a sáb. · 8:00 a 18:00',
      zones: ['San Miguel de Tucumán', 'Yerba Buena'],
      serviceIds: ['plomeria'],
      photos: [],
    },
  });
  const [messages, setMessages] = useState({
    'TV-1042': [
      {
        id: 1,
        sender: 'worker',
        text: '¡Hola, Julieta! Vi la descripción. Puedo pasar hoy para revisar la canilla.',
        time: '09:15',
      },
      {
        id: 2,
        sender: 'client',
        text: '¡Hola, Martín! Sí, a las 10:30 me viene bien. Muchas gracias.',
        time: '09:18',
      },
      {
        id: 3,
        sender: 'worker',
        text: 'Perfecto, nos vemos a esa hora. Te aviso cuando esté en camino.',
        time: '09:20',
      },
    ],
  });
  const updateRequest = (id, changes) =>
    setRequests((items) => items.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  const notify = (text) => setToast(text);
  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        location,
        setLocation,
        requests,
        setRequests,
        updateRequest,
        reviews,
        setReviews,
        messages,
        setMessages,
        toast,
        setToast,
        notify,
        profiles,
        setProfiles,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () => useContext(DemoContext);
