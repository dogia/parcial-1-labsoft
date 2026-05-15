# HU09 - Inicializacion del frontend en Angular

**Como** equipo de desarrollo
**Quiero** disponer de un proyecto Angular configurado de base con linter, formateo, estilos y proxy hacia el backend
**Para** poder construir las pantallas del sistema de viveros sobre una base consistente y reproducible.

---

## Contexto

Hasta este punto el repositorio solo contiene el backend en NestJS. El enunciado exige visualizacion de informacion y exportacion de reportes, por lo que es necesaria una capa de presentacion. Se elige Angular en su version 21 con componentes standalone, signals y el nuevo control flow (`@if`, `@for`), por ser el stack vigente al momento del desarrollo.

## Criterios de aceptacion

```gherkin
Escenario: Estructura del repositorio
  Dado que el repositorio ya contiene la carpeta backend/
  Cuando se complete la inicializacion del frontend
  Entonces debe existir una carpeta frontend/ hermana de backend/
  Y la aplicacion Angular debe arrancar con "npm start" en el puerto 4200

Escenario: Estilos con Tailwind
  Dado que el proyecto Angular fue creado
  Cuando se ejecute la aplicacion
  Entonces las clases utilitarias de Tailwind deben estar disponibles
  Y debe existir un archivo de configuracion tailwind.config.js

Escenario: Comunicacion con el backend
  Dado que el backend escucha en http://localhost:3000
  Cuando un servicio del frontend invoque una ruta relativa "/api/..."
  Entonces el dev-server debe redirigir la peticion al backend
  Sin requerir CORS adicional para desarrollo

Escenario: Calidad de codigo
  Dado que se han escrito archivos TypeScript
  Cuando se ejecute "npm run lint"
  Entonces no deben reportarse errores
  Y "npm run format:check" debe pasar
```

## Tareas tecnicas

- [x] Crear rama `feature/HU09-init-frontend-angular`.
- [x] Generar proyecto Angular 21 standalone con routing y SCSS.
- [x] Instalar y configurar Tailwind CSS.
- [x] Configurar proxy de desarrollo hacia `http://localhost:3000`.
- [x] Definir variables de entorno (`environment.ts`, `environment.development.ts`).
- [x] Configurar `eslint` y `prettier` consistentes con el backend.
- [x] Crear estructura base de carpetas: `core/`, `shared/`, `features/`.
- [x] README del frontend.

## Definicion de hecho

- El proyecto compila (`npm run build`) sin advertencias.
- `npm start` levanta la aplicacion y muestra la pantalla inicial.
- Tailwind aplica estilos correctamente.
- El proxy redirige `/api/*` al backend.
- Se documenta en `frontend/README.md` como ejecutarlo.

## Notas de diseno

- **Standalone components** en lugar de NgModules: simplifica el bootstrapping y se alinea con la guia oficial de Angular a partir de la version 17.
- **Signals** y **control flow nuevo**: preferidos sobre `*ngIf` / `*ngFor` y `BehaviorSubject` para estado local.
- Estructura por feature, con `core/` reservado para servicios globales (auth, http) y `shared/` para componentes presentacionales reutilizables.
