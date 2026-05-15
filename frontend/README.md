# Frontend - Sistema de Viveros

Aplicacion Angular 21 (standalone, signals, control flow nuevo) para el sistema de administracion de viveros, productores, fincas, labores y productos de control.

## Requisitos

- Node.js >= 20
- npm >= 10
- Backend corriendo en `http://localhost:3000` (ver `../backend/README.md`)

## Instalacion

```bash
npm install
```

## Comandos

| Comando | Descripcion |
|---|---|
| `npm start` | Levanta el servidor de desarrollo en `http://localhost:4200` con proxy hacia el backend. |
| `npm run build` | Genera el bundle de produccion en `dist/frontend`. |
| `npm test` | Ejecuta las pruebas unitarias con Vitest. |
| `npm run lint` | Verifica el codigo con ESLint y angular-eslint. |
| `npm run format` | Formatea archivos con Prettier. |
| `npm run format:check` | Verifica formato sin modificar archivos. |

## Estructura

```
src/
├── app/
│   ├── core/        # servicios globales (auth, http, guards, interceptors)
│   ├── shared/      # componentes presentacionales reutilizables
│   ├── features/    # vistas y logica por dominio (productores, viveros, ...)
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.html
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
├── styles.scss
└── main.ts
```

## Stack

- **Angular 21** con componentes standalone y signals.
- **Tailwind CSS v4** para estilos utilitarios.
- **RxJS** y la API moderna de `HttpClient` con `provideHttpClient(withFetch())`.
- **Vitest** como test runner.
- **ESLint** + **angular-eslint** + **Prettier** para calidad de codigo.

## Configuracion

El archivo `proxy.conf.json` redirige todas las llamadas `/api/*` hacia el backend en `http://localhost:3000`, evitando configurar CORS en desarrollo.

Las URLs base de la API se exponen via `src/environments/environment.ts` (produccion) y `environment.development.ts` (desarrollo).
