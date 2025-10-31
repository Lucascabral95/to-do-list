<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# Plataforma de Gestión de Tareas Inteligente

## Descripción General

**Plataforma de Gestión de Tareas Inteligente** es una aplicación web moderna desarrollada con [Next.js 14](https://nextjs.org/), [React 18](https://react.dev/) y [TypeScript](https://www.typescriptlang.org/), diseñada para ayudar a las personas a organizar su día a día. Permite registrar tareas con prioridades, agruparlas por proyectos, monitorear vencimientos y trabajar con una experiencia UI optimizada gracias a NextUI y animaciones suaves. El proyecto sigue principios de arquitectura limpia, integra autenticación con NextAuth, persiste datos en MongoDB mediante Mongoose y ofrece feedback inmediato con notificaciones toast.

---

## ⚙️ Características Principales

- **Dashboard de productividad:** vistas dedicadas para hoy, bandeja de entrada, proyectos, historial y próximas tareas.
- **Creación rápida de tareas:** formulario dinámico con NextUI para capturar título, descripción, prioridad y fecha límite.
- **Gestión de proyectos personales:** creación y eliminación de proyectos asociados a cada usuario autenticado.
- **Prioridades configurables:** niveles "Prioridad 1", "Prioridad 2" y "Prioridad 3" con códigos de color.
- **Marcado de estado en un clic:** completar o eliminar tareas con confirmación visual inmediata via toast.
- **Filtrado automático del día:** vista "Hoy" alimentada por hooks que seleccionan tareas con vencimiento actual.
- **Autenticación segura:** login tradicional con credenciales y opción de inicio de sesión con Google mediante NextAuth.
- **Actualización en tiempo real:** estado global con Zustand que refresca la UI tras crear, completar o borrar tareas.
- **Skeletons y loaders:** pantallas con skeleton y spinner reutilizables para mejorar la percepción de carga.
- **Diseño responsivo:** layout adaptado a escritorio y móvil con encabezados específicos y estilos en SCSS.

---

## 🚀 Tecnologías Utilizadas

### Core
- **Framework:** [Next.js 14 App Router](https://nextjs.org/docs/app)
- **Lenguaje:** [TypeScript 5.9](https://www.typescriptlang.org/)
- **Runtime React:** [React 18](https://react.dev/) y [React DOM 18](https://react.dev/reference/react-dom)

### UI y Estilos
- **Component Library:** [NextUI 2](https://nextui.org/)
- **Animaciones:** [Framer Motion 11](https://www.framer.com/motion/)
- **Iconografía:** [React Icons](https://react-icons.github.io/react-icons/)
- **Skeletons:** [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton)
- **Estilos:** SCSS modular y variables CSS personalizadas

### Gestión de Estado y Datos
- **Estado global:** [Zustand 4.5](https://github.com/pmndrs/zustand)
- **HTTP Client:** [Axios 1.7](https://axios-http.com/)
- **Gestión de fechas:** [Moment.js](https://momentjs.com/)

### Integraciones
- **Autenticación:** [NextAuth 4](https://next-auth.js.org/) con proveedores de credenciales y Google
- **Base de datos:** [MongoDB](https://www.mongodb.com/) + [Mongoose 8](https://mongoosejs.com/)
- **Servicios internos:** Rutas API en Next.js para tareas y proyectos protegidas por sesión

### Notificaciones y Feedback
- **Toasts:** [react-hot-toast](https://react-hot-toast.com/)

### Herramientas de Desarrollo
- **Linting:** [ESLint](https://eslint.org/) con configuración Next.js
- **Tipado:** [TypeScript ESLint](https://typescript-eslint.io/)

---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Rutas Disponibles](#rutas-disponibles)
- [Hooks Personalizados](#hooks-personalizados)
- [Descripción de Componentes](#descripción-de-componentes)
- [Catálogo de Servicios](#catálogo-de-servicios)
- [Gestión de Estado](#gestión-de-estado)
- [Arquitectura de Estilos](#arquitectura-de-estilos)
- [Flujo de Trabajo de Desarrollo](#flujo-de-trabajo-de-desarrollo)
- [Optimizaciones de Rendimiento](#optimizaciones-de-rendimiento)
- [Soporte de Navegadores](#soporte-de-navegadores)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)
- [Agradecimientos](#agradecimientos)

---

## Instalación

1. **Cloná el repositorio:**

```bash
git clone https://github.com/Lucascabral95/to-do-list.git
cd to-do-list
```

2. **Instalá las dependencias:**

```bash
npm install
```

3. **Configurá las variables de entorno:**

- Usá `.env.template` como guía para generar un archivo `.env.local` con tus credenciales de MongoDB y NextAuth.

4. **Levantá el entorno de desarrollo:**

```bash
npm run dev
```

---

## Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Build de Producción

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Estructura del Proyecto

```bash
to-do-list/
├── public/                      # Assets estáticos (imágenes de marketing y placeholders)
├── src/
│   ├── app/                     # Rutas App Router (páginas, layouts y API routes)
│   │   ├── auth/                # Pantallas de login y registro
│   │   ├── app/                 # Dashboard autenticado (hoy, bandeja, proyectos, etc.)
│   │   ├── addtasks/            # Ruta API para tareas (GET/POST)
│   │   ├── nuevo-proyecto/      # Ruta API y páginas dinámicas de proyectos
│   │   └── eliminar-tareas/     # Endpoints para completar/eliminar tareas
│   ├── components/              # Componentes UI compartidos (Header, CardTask, Structure...)
│   ├── infrastructure/          # Capa de infraestructura (constants, services, types)
│   ├── models/                  # Modelos Mongoose (Tasks, Projects, Clients, Users)
│   ├── presentation/            # Hooks y componentes específicos de presentación
│   ├── services/                # Configuración de NextAuth y conexión MongoDB
│   └── zustand.jsx              # Store global de actualización
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
└── README.md
```

---

## Arquitectura

El proyecto aplica principios de **Clean Architecture** separando responsabilidades:

1. **Capa de Presentación (`src/presentation` y `src/components`):** componentes React, hooks y layout general.
2. **Capa de Infraestructura (`src/infrastructure`):** servicios HTTP reutilizables, constantes, tipados y configuraciones globales.
3. **Capa de Dominio/Modelos (`src/models`):** esquemas Mongoose para persistir tareas, proyectos, clientes y usuarios.
4. **Capa de Servicios (`src/services` y rutas API en `src/app`):** conexión a MongoDB, definiciones de NextAuth y endpoints serverless.

Esta separación simplifica el testeo, promueve la reutilización y favorece la escalabilidad.

---

## Rutas Disponibles

### Rutas Públicas

| Ruta | Descripción |
| --- | --- |
| `/` | Landing con call-to-action e ingreso a la plataforma |
| `/auth/login` | Inicio de sesión con credenciales o Google |
| `/auth/register` | Registro de nuevas cuentas |

### Rutas Protegidas (Dashboard)

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/app/hoy` | `Hoy` | Tareas filtradas para la fecha actual |
| `/app/bandeja-de-entrada` | `BandejaDeEntradaContent` | Todas las tareas del usuario con creación rápida |
| `/app/mis-proyectos` | `MisProyectos` | Listado de proyectos personales |
| `/app/nuevo-proyecto/[id]` | `NuevoProyecto` | Detalle de tareas asociadas a un proyecto específico |
| `/app/historial-de-tareas` | `HistorialDeTareas` | Tabla con historial y estado de tareas |
| `/app/proximo` | `Proximo` | Vista para tareas futuras (placeholder en evolución) |
| `/app/agregar-tarea` | `AgregarTarea` | Espacio reservado para utilidades adicionales |

Las rutas API asociadas (`/addtasks`, `/nuevo-proyecto`, `/eliminar-tareas`) gestionan altas, bajas, actualizaciones y consultas.

---

## Hooks Personalizados

- **`useTasks`**: carga tareas del usuario autenticado, maneja estados de carga y error.
- **`useTodayTasks`**: filtra tareas que vencen hoy reutilizando la capa de servicios.
- **`useTaskActions`**: encapsula eliminar y completar tareas con feedback toast.
- **`useTaskCreator`**: controla apertura/cierre del creador de tareas.
- **`useTasksCreatorForm`**: gestiona estado local del formulario y validaciones.
- **`useTasksCreatorSubmit`**: orquesta el POST de tareas, ajusta fechas y dispara actualizaciones globales.
- **`useHeader`**: obtiene proyectos y estado de navegación para los encabezados.
- **`useModalProjectMobile` / `useModalTaskMobile`**: controlan modales en experiencias móviles.
- **`useTableTasks`**: prepara datos para la tabla de historial.
- **`useSocialLinks`**: expone enlaces a redes sociales desde constantes centralizadas.

---

## Descripción de Componentes

### Componentes Principales

- **`Structure`**: layout base que integra encabezado de escritorio, versión mobile y contenedor principal.
- **`Header` / `HeaderMobile`**: navegación lateral/top, gestión de proyectos y acciones de sesión.
- **`CardTask`**: tarjetas con animaciones (Framer Motion) para visualizar tareas, prioridades y acciones.
- **`TasksCreator`**: formulario flotante NextUI para crear tareas con prioridad y vencimiento.
- **`SinTareas`**: estado vacío reutilizable con mensajes parametrizados.
- **`Table`**: tabla responsive para el historial de tareas.
- **`LoadingSpinner`** y **`SkeletonHeader`**: componentes de feedback visual durante cargas.
- **`ErrorBoundary`**: captura errores en bandeja de entrada y muestra mensajes accesibles.

### Componentes Utilitarios

- **`Modals`**: lógica compartida para modales en mobile.
- **`Footer`**: pie de página con enlaces sociales.
- **`TasksCreator` helpers**: dropdowns, inputs y acciones encapsuladas.

---

## Catálogo de Servicios

1. **Gestión de tareas diarias:** crear, listar, completar y eliminar tareas con seguimiento de estado.
2. **Organización por proyectos:** agrupar tareas por proyectos personalizados del usuario.
3. **Historial centralizado:** tabla con registro de tareas y metadata (estado, prioridad, fechas).
4. **Vistas contextuales:** bandeja de entrada global, vista de hoy y detalle por proyecto dinámico.
5. **Autenticación y permisos:** NextAuth protege el acceso al dashboard, redireccionando usuarios no autenticados.
6. **Notificaciones instantáneas:** toast para confirmar acciones críticas o reportar errores.

---

## Gestión de Estado

- **Zustand:** toggles de actualización (`actualizador`) para refrescar datos tras operaciones CRUD.
- **NextAuth Session:** acceso a `session.user.id`, imagen y proveedores para condicionar UI y llamadas API.
- **Estado local con hooks:** control de formularios, menús, modales y skeletons en componentes específicos.

---

## Arquitectura de Estilos

- **SCSS modular:** estilos específicos por feature (e.g. `hoy.scss`, `bandeja.scss`).
- **Variables y mixins propios:** definidas en `globals.css` y archivos SCSS para mantener consistencia.
- **NextUI Theme:** componentes accesibles y responsivos listos para producción.
- **Responsive design:** encabezados diferenciados para desktop/mobile y layouts flex adaptables.

---

## Flujo de Trabajo de Desarrollo

### Agregar un nuevo componente
1. Crear carpeta en `src/components` o `src/presentation/components` según el alcance.
2. Definir el componente en `.tsx`/`.jsx` y sus estilos asociados `.scss`.
3. Exportar desde índices si corresponde (por ejemplo, `src/presentation/hooks/index.ts`).
4. Añadir pruebas manuales en la vista que consumirá el componente.

### Agregar un nuevo servicio o endpoint
1. Crear método en `tasks.service.ts` o un nuevo servicio dentro de `src/infrastructure/services`.
2. Registrar la ruta en `API_ENDPOINTS` para mantener consistencia.
3. Implementar endpoint en `src/app/<ruta>/route.jsx` utilizando Mongoose y `getServerSession` cuando sea necesario.
4. Consumir desde el hook o componente correspondiente actualizando estados globales.

---

## Optimizaciones de Rendimiento

- **Pre-render de Next.js:** páginas estáticas/híbridas con App Router.
- **Code splitting automático:** componentes y rutas cargados bajo demanda.
- **Interceptors HTTP:** manejo centralizado de tokens y errores.
- **Uso de skeletons:** reduce el tiempo percibido en cargas de datos.
- **Memoización con `memo` y `useCallback`:** evita renders innecesarios en componentes críticos (e.g. `CardTask`).

---

## Soporte de Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)
- Navegadores móviles modernos (iOS Safari, Chrome Mobile)

---

## Contribuciones

¡Las contribuciones son bienvenidas! Seguimos la convención de [Conventional Commits](https://www.conventionalcommits.org/):

1. Hacé un fork del repositorio.
2. Creá una rama: `git checkout -b feat/nueva-funcionalidad`.
3. Implementá cambios y agregá pruebas si aplica.
4. Commit con un mensaje descriptivo (ej. `feat: agregar filtros por prioridad`).
5. Push de la rama y creación de Pull Request detallando los cambios.

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Revisá el archivo `LICENSE` (o agregalo si aún no existe) para más detalles.

---

## 📬 Contacto

- **Autor:** Lucas Cabral
- **Email:** [lucassimple@hotmail.com](mailto:lucassimple@hotmail.com)
- **LinkedIn:** [linkedin.com/in/lucas-gastón-cabral](https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/)
- **Portfolio:** [portfolio-web-dev](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)
- **GitHub:** [github.com/Lucascabral95](https://github.com/Lucascabral95)

---

## Agradecimientos

- Comunidad de Next.js y React por el ecosistema moderno.
- Equipo de NextUI por la librería de componentes.
- Contributors de Mongoose y MongoDB por simplificar la persistencia.
- Comunidad open source por las herramientas que hacen posible este proyecto.

---

<p align="center">
  Desarrollado con ❤️ por Lucas Cabral
</p>

