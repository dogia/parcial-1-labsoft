# HU17 - Hacer que el sistema sea ejecutable desde cero

**Como** docente o evaluador que clona el repositorio por primera vez
**Quiero** poder arrancar el sistema, iniciar sesion y operar con la aplicacion sin necesidad de manipular la base de datos a mano
**Para** evaluarlo sin friccion y para que el equipo de desarrollo pueda hacer demos sin pasos manuales adicionales.

---

## Contexto

Al cerrar las HUs anteriores el sistema tiene login con JWT, guards globales por rol y CRUDs completos. Sin embargo, un repositorio recien clonado no es ejecutable de extremo a extremo por cuatro razones:

1. No existen usuarios en la base de datos, por lo que nadie puede pasar el login.
2. La gestion de `/usuarios` esta restringida a `ADMIN`, por lo que tampoco se puede crear el primer usuario via API sin estar ya autenticado como ADMIN.
3. El backend no habilita CORS, asi que el frontend en otro dominio (o puerto distinto sin proxy) no puede invocarlo.
4. El interceptor del frontend no reacciona a un 401 expirado: el usuario queda atrapado en pantallas vacias sin saber que su sesion vencio.

Esta historia cierra los cuatro huecos como un solo cambio funcional ("bootstrap del sistema").

## Criterios de aceptacion

```gherkin
Escenario: Primer arranque sin datos
  Dado un repositorio recien clonado
  Cuando se ejecuta "npm run seed" en backend/
  Entonces se crea un usuario administrador con correo y contrasena del .env
  Y si el usuario ya existe el comando no falla, solo informa
  Y el primer login a /auth/login con esas credenciales devuelve 200 y un JWT

Escenario: Frontend separado del backend
  Dado el backend en http://localhost:3000 y el frontend desplegado en otro host
  Cuando el frontend invoca el API
  Entonces el backend acepta la peticion con los headers CORS adecuados

Escenario: Configuracion segura en Docker
  Dado el repositorio
  Cuando se inspecciona docker-compose.yml
  Entonces se observa que JWT_SECRET se pasa como variable de entorno
  Y la documentacion menciona que debe cambiarse en produccion

Escenario: Sesion expirada
  Dado un usuario autenticado cuyo token caduca
  Cuando realiza una peticion al backend y obtiene 401
  Entonces el interceptor limpia la sesion y redirige a /login
```

## Tareas tecnicas

- [x] Crear rama `feature/HU17-bootstrap-ejecutable`.
- [x] Script `npm run seed` que cree el primer administrador si no existe (lee correo y contrasena desde env, valores por defecto solo para desarrollo).
- [x] Habilitar CORS en `main.ts` con `app.enableCors`.
- [x] Pasar `JWT_SECRET` (y `JWT_EXPIRES_IN`) por `docker-compose.yml`.
- [x] Anadir `SEED_ADMIN_*` al `docker-compose.yml` y al ejemplo de variables.
- [x] Interceptor de Angular: ante 401 limpia la sesion y redirige a `/login`.
- [x] Documentar el nuevo comando de seed en el README raiz.

## Definicion de hecho

- `npm test` y `npm run build` siguen pasando en backend.
- `npm test`, `npm run lint` y `npm run build` siguen pasando en frontend.
- Levantar Docker y correr `npm run seed` deja la base lista para usar.
- Una respuesta 401 del backend redirige al login en el frontend.

## Notas de diseno

- El seed se implementa como un script standalone que crea una `NestApplicationContext` (`NestFactory.createApplicationContext`) para reusar el `UsuarioService` con bcrypt y TypeORM, sin levantar el servidor HTTP.
- El interceptor delega la limpieza de sesion al `AuthService` y la redireccion al `Router`, conservando responsabilidades.
- Se conservan fallbacks "razonables" para desarrollo en las variables de entorno, pero los valores reales se documentan como obligatorios en produccion.
