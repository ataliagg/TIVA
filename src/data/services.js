export const locations = [
  'San Miguel de Tucumán',
  'Yerba Buena',
  'Tafí Viejo',
  'Banda del Río Salí',
];

export const services = [
  {
    id: 'plomeria',
    name: 'Plomería',
    profession: 'Plomero',
    icon: 'faucet',
    description: 'Canillas, pérdidas e instalaciones de agua.',
    color: 'blue',
  },
  {
    id: 'electricidad',
    name: 'Electricidad',
    profession: 'Electricista',
    icon: 'zap',
    description: 'Instalaciones, tableros y reparaciones eléctricas.',
    color: 'yellow',
  },
  {
    id: 'gas',
    name: 'Gasista',
    profession: 'Gasista',
    icon: 'flame',
    description: 'Instalaciones y mantenimiento de artefactos.',
    color: 'orange',
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    profession: 'Limpieza del hogar',
    icon: 'sparkles',
    description: 'Limpieza y cuidado de tus espacios.',
    color: 'purple',
  },
  {
    id: 'jardineria',
    name: 'Jardinería',
    profession: 'Jardinero',
    icon: 'sprout',
    description: 'Poda, mantenimiento y cuidado de tu jardín.',
    color: 'green',
  },
  {
    id: 'mascotas',
    name: 'Paseo de mascotas',
    profession: 'Paseadora de mascotas',
    icon: 'dog',
    description: 'Paseos y compañía para tus mascotas.',
    color: 'pink',
  },
  {
    id: 'carpinteria',
    name: 'Carpintería',
    profession: 'Carpintero',
    icon: 'hammer',
    description: 'Arreglos, muebles y trabajos en madera.',
    color: 'orange',
  },
  {
    id: 'pintura',
    name: 'Pintura',
    profession: 'Pintor',
    icon: 'paintbrush',
    description: 'Dale un nuevo color a tu hogar.',
    color: 'blue',
  },
];

export const getService = (id) => services.find((service) => service.id === id);
export const money = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
