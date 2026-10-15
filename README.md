# TIVA · Servicios cerca tuyo

Frontend en **React y JSX**, con un **CSS independiente por cada componente, página y layout**. Basado en los requisitos de `Untitled document.docx` y en las diez imágenes proporcionadas. Ubicaciones adaptadas a **San Miguel de Tucumán, Yerba Buena, Tafí Viejo y Banda del Río Salí**.

## Ejecutar el proyecto

Requiere Node.js 20.19+ o 22.12+ y npm.

Desde esta carpeta:

```bash
npm install
npm run dev
```

Abrí la dirección que indique Vite en la terminal. Por defecto: `http://127.0.0.1:5173`.

```bash
npm run build     # Genera la versión de producción en dist/
npm run preview   # Permite revisar ese resultado localmente
npm run format    # Ordena los archivos con Prettier
```

## Alcance

Es una **maqueta visual navegable**, sin backend. Usa React Router para navegar y React Context para simular interacciones. La barra superior permite explorar como visitante, cliente, trabajador o administrador sin tener que completar formularios.

- No autentica usuarios ni crea cuentas reales. Las contraseñas no se guardan.
- No envía solicitudes, correos ni mensajes a personas reales.
- No almacena datos en una base de datos ni en localStorage. Al recargar, se restauran los ejemplos.
- Las imágenes adjuntas se leen localmente para mostrar una vista previa; no se suben a un servidor.
- No procesa pagos, verifica matrículas ni realiza verificaciones reales de identidad.
- Los nombres, valores, estadísticas y opiniones son datos ilustrativos. Los indicadores de calificación del catálogo son estáticos; las nuevas reseñas aparecen en la vista de la sesión.
- La edición de perfiles y servicios se conserva al navegar entre sus pantallas. No modifica el catálogo ficticio público.
- La moderación del administrador modifica su listado de muestra; no aplica permisos reales ni modifica contenido público.
- Los términos y privacidad son textos explicativos del prototipo académico, no documentos finales para producción.

## Pantallas

| Área                     | Rutas principales                                                                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicio                   | `/`                                                                                                                                                                              |
| Catálogo y búsqueda      | `/servicios`, `/buscar`                                                                                                                                                          |
| Perfil de trabajador     | `/profesionales/martin` y otros perfiles de ejemplo                                                                                                                              |
| Solicitud de presupuesto | `/solicitar/martin`                                                                                                                                                              |
| Acceso y registro        | `/ingresar`, `/registro`, `/registro?tipo=trabajador`                                                                                                                            |
| Información y ayuda      | `/como-funciona`, `/soy-trabajador`, `/ayuda`                                                                                                                                    |
| Cliente                  | `/cliente`, `/cliente/solicitudes`, `/cliente/solicitudes/TV-1042`, `/cliente/mensajes`, `/cliente/calificaciones`, `/cliente/perfil`                                            |
| Calificar un servicio    | `/cliente/calificar/TV-1036`                                                                                                                                                     |
| Trabajador               | `/trabajador`, `/trabajador/solicitudes`, `/trabajador/solicitudes/TV-1045`, `/trabajador/servicios`, `/trabajador/mensajes`, `/trabajador/calificaciones`, `/trabajador/perfil` |
| Administración           | `/admin`                                                                                                                                                                         |
| Textos del prototipo     | `/legal/terminos`, `/legal/privacidad`                                                                                                                                           |
| Página no encontrada     | Cualquier ruta no definida                                                                                                                                                       |

## Organización

```text
tiva-web/
├── public/
│   ├── favicon.svg
│   └── images/                # Fotografías extraídas de las referencias
├── src/
│   ├── components/
│   │   ├── common/            # Logo, Icon, Avatar, Modal, Toast, EmptyState, ImageUploader
│   │   ├── layout/            # Header, Footer, Sidebar, BottomNav
│   │   ├── home/              # Secciones independientes de la página de inicio
│   │   ├── services/          # Tarjetas de categorías
│   │   ├── search/            # Buscador y panel de filtros
│   │   ├── workers/           # Tarjetas, calificación y galería
│   │   ├── requests/          # Formularios, tarjetas y estados de solicitudes
│   │   ├── messages/          # Conversación
│   │   └── reviews/           # Tarjetas y formulario de calificación
│   ├── pages/                 # Pantallas completas; cada una con su CSS
│   ├── layouts/               # Estructura pública y paneles por rol
│   ├── data/                  # Servicios, localidades, trabajadores, solicitudes
│   ├── context/               # Estado temporal de la demostración
│   ├── App.jsx                # Rutas de la aplicación
│   ├── App.css
│   ├── main.jsx               # Punto de entrada
│   └── styles.css             # Variables y estilos globales compartidos
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

Cada componente visual tiene un archivo con el mismo nombre: por ejemplo, `WorkerCard.jsx` importa `WorkerCard.css`. `DemoContext.jsx` es un proveedor de estado, no una pieza visual, por eso no tiene CSS. Los layouts de cliente y trabajador comparten estructura y componentes mediante la propiedad `worker`, evitando duplicación.

## Recorridos para probar

1. **Buscar y solicitar:** Inicio → Plomería → Ver perfil → Solicitar presupuesto → completar datos ficticios → Enviar solicitud → Ver detalle.
2. **Filtrar:** Buscar → servicio, zona, precio, calificación, disponibilidad y urgencia → Limpiar filtros. También hay ordenamiento y estado sin resultados.
3. **Responder como trabajador:** selector superior → Trabajador → Solicitudes recibidas → Ver detalle → Aceptar, Rechazar o Enviar presupuesto. Se puede marcar como finalizada una solicitud confirmada.
4. **Mensajes:** entrar desde el detalle de una solicitud o desde el panel. Cada conversación se vincula con una solicitud.
5. **Calificar:** Cliente → Mis solicitudes → Historial → servicio finalizado de limpieza → Calificar. Solo se habilita para solicitudes finalizadas y sin calificar.
6. **Editar el perfil:** Trabajador → Mi perfil → servicios, zonas, presentación, experiencia, precio, horario y fotos → Guardar.
7. **Administración:** selector superior → Administrador → Usuarios o Contenido. Suspender/reactivar y ocultar/restaurar son acciones reversibles de muestra.

## Relación con el Word

- **RF01–RF02:** formularios visuales de registro, ingreso y salida de la demo.
- **RF03–RF04:** edición de perfil profesional con rubros, zonas, disponibilidad, experiencia, precio y fotos.
- **RF05–RF08:** búsqueda, filtros, listado, perfil y trabajos anteriores.
- **RF09–RF15:** formulario de solicitud, campos obligatorios, fotos, urgencia, detalle, notificaciones ilustrativas, presupuesto y estados.
- **RF16:** interfaz de conversaciones vinculadas a solicitudes.
- **RF17–RF18:** formulario y visualización de calificaciones; cálculo global y validación real quedan para el backend.
- **RF19:** vista visual para gestionar usuarios y moderar opiniones.

Se priorizó el documento cuando difería de las imágenes: cada solicitud tiene **un único trabajador**, no se agregó envío masivo y no hay pagos dentro de TIVA. La búsqueda está abierta para poder recorrer el prototipo; la autenticación, autorización por rol y las validaciones del servidor deben implementarse al agregar backend.

## Diseño y recursos

Paleta azul y celeste, tarjetas claras, bordes redondeados, íconos Lucide, navegación inferior para celular y panel lateral en escritorio. Las variables de color están en `src/styles.css`.

Las fotos de ejemplo se recortaron de las imágenes aportadas: retratos de `1.jpeg` y trabajos de `WhatsApp Image 2026-10-07 at 08.20.27.jpeg`. Se mantuvieron los originales fuera de este proyecto. Son recursos del prototipo, no fotografías verificadas de prestadores reales.

Tipografías DM Sans y Manrope mediante Google Fonts, con respaldo local `sans-serif` si no hay conexión. Los íconos y las fotografías se sirven desde el proyecto.
