# HU10 - Pantalla de inicio de sesion y manejo de la sesion en el frontend

**Como** usuario del sistema (administrador o empleado)
**Quiero** una pantalla de inicio de sesion en el frontend
**Para** introducir mis credenciales y comenzar a usar la aplicacion segun mis privilegios.

---

## Contexto

El backend ya expone `POST /auth/login` (HU05) y todas las rutas estan protegidas con `JwtAuthGuard` y `RolesGuard` (HU06). En el frontend, recien inicializado en HU09, no existe ninguna pantalla aun. Esta historia introduce:

- Un servicio de autenticacion en Angular que llama al endpoint, guarda el token y la informacion del usuario.
- Un interceptor HTTP que adjunta `Authorization: Bearer <token>` en cada peticion.
- Un guard de ruta `authGuard` que redirige a `/login` cuando no hay sesion, y `adminGuard` para rutas restringidas.
- La pantalla `LoginComponent` con un formulario reactivo.
- Un header que muestra el usuario activo y un boton de cerrar sesion.

## Criterios de aceptacion

```gherkin
Escenario: Acceder a la app sin sesion
  Dado que no hay token en el navegador
  Cuando el usuario abre cualquier ruta privada (por ejemplo "/")
  Entonces es redirigido a "/login"

Escenario: Iniciar sesion exitosamente
  Dado un usuario activo en el backend
  Cuando completa el formulario con credenciales validas y envia
  Entonces el sistema almacena el token y los datos del usuario
  Y redirige al panel principal "/"

Escenario: Credenciales invalidas
  Dado el formulario de login
  Cuando el usuario envia credenciales incorrectas
  Entonces se muestra un mensaje claro "Credenciales invalidas"
  Y no se almacena ningun token

Escenario: Cerrar sesion
  Dado un usuario autenticado
  Cuando hace clic en "Cerrar sesion"
  Entonces el token y la informacion se eliminan
  Y se redirige a "/login"

Escenario: Interceptor adjunta el token
  Dado que hay un token guardado
  Cuando el frontend realiza una peticion HTTP
  Entonces se envia el header Authorization: Bearer <token>
```

## Tareas tecnicas

- [x] Crear rama `feature/HU10-login-ui`.
- [x] `core/auth/auth.service.ts` con `login`, `logout`, `currentUser` (signal), `isAuthenticated`, `isAdmin`.
- [x] `core/auth/auth.interceptor.ts` que inyecta el header Bearer.
- [x] `core/auth/auth.guard.ts` (`authGuard`, `adminGuard`).
- [x] Registrar el interceptor en `app.config.ts`.
- [x] `features/auth/login/login.ts` con formulario reactivo.
- [x] Header de la app con usuario y boton de logout.
- [x] Pruebas unitarias del AuthService (login exitoso, fallido, logout).

## Definicion de hecho

- El usuario puede iniciar y cerrar sesion.
- Las rutas privadas estan protegidas.
- Las peticiones HTTP llevan el token.
- `npm run lint` y `npm test` pasan en frontend.

## Notas de diseno

- Se usa `signal()` y `computed()` para el estado de sesion, alineado con la convencion de Angular 21.
- El token se persiste en `localStorage` con la clave `viveros:auth`. Se hidrata al arrancar la app.
- El interceptor evita inyectar el token en `/api/auth/login` para no enviar headers innecesarios.
- `authGuard` y `adminGuard` se exportan como funciones (`CanActivateFn`), no como clases, segun la guia oficial de Angular.
