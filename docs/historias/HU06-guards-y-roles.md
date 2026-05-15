# HU06 - Guards de autenticacion y autorizacion por rol

**Como** equipo de plataforma
**Quiero** que las rutas del sistema esten protegidas por un guard de autenticacion y otro de rol
**Para** que solo los usuarios autenticados accedan al sistema y solo los administradores puedan crear, modificar o eliminar informacion, mientras que los empleados solo puedan consultar.

---

## Contexto

El enunciado especifica dos roles con privilegios distintos:

> "El Administrador puede Crear, Modificar, Visualizar, Eliminar toda la informacion del sistema."
> "El Empleado solamente tendra el privilegio de Visualizacion de la informacion."

Con la entidad `Usuario` (HU04) y el login con JWT (HU05) ya en su sitio, ahora hay que aplicar autorizacion en el resto de los controladores. Se implementan dos guards reutilizables:

1. `JwtAuthGuard`: extrae el token Bearer del header `Authorization`, lo verifica con `JwtService` y agrega el payload al request.
2. `RolesGuard`: lee el metadato `roles` definido por el decorador `@Roles(...)` y compara con `request.user.rol`.

## Criterios de aceptacion

```gherkin
Escenario: Acceso sin token
  Dado un endpoint protegido (ej. GET /productores)
  Cuando se invoca sin header Authorization
  Entonces la respuesta es 401

Escenario: Acceso con token valido como EMPLEADO
  Dado un usuario con rol EMPLEADO autenticado
  Cuando consulta GET /productores
  Entonces la respuesta es 200

Escenario: Empleado intenta modificar
  Dado un usuario con rol EMPLEADO autenticado
  Cuando invoca POST /productores
  Entonces la respuesta es 403

Escenario: Administrador puede modificar
  Dado un usuario con rol ADMIN autenticado
  Cuando invoca POST /productores con un payload valido
  Entonces la respuesta es 201

Escenario: Endpoint publico
  Dado el endpoint POST /auth/login
  Cuando se invoca sin autenticacion
  Entonces continua funcionando sin ser bloqueado por el JwtAuthGuard
```

## Tareas tecnicas

- [x] Crear rama `feature/HU06-guards-y-roles`.
- [x] Implementar `JwtAuthGuard` (lee y verifica el header Authorization).
- [x] Implementar decorador `@Roles(...roles)` y `RolesGuard`.
- [x] Registrar ambos guards de forma global a traves de `APP_GUARD`.
- [x] Marcar `POST /auth/login` como ruta publica con `@Public()`.
- [x] Anotar todos los controladores existentes con `@Roles(RolUsuario.ADMIN)` en operaciones de escritura.
- [x] Documentar en el README la convencion.

## Definicion de hecho

- Las pruebas unitarias siguen pasando.
- Todas las rutas (menos login) requieren autenticacion.
- Las operaciones de escritura quedan restringidas a `ADMIN`.
- Existe un decorador `@Public()` que permite excluir rutas concretas.

## Notas de diseno

- Se elige aplicar los guards globalmente (`APP_GUARD`) en lugar de declararlos endpoint por endpoint. Asi, el comportamiento por defecto es "seguro" (requiere token), y los puntos publicos se marcan con `@Public()`. Esta convencion es la recomendada en la guia oficial de NestJS.
- El `RolesGuard` lee el metadato con `Reflector` y, si no hay `@Roles(...)` declarado, permite el paso (lectura para cualquier usuario autenticado).
- Los guards no dependen de Passport, solo de `JwtService` (ya importado de forma global por `JwtModule.register({ global: true })` en HU05).
