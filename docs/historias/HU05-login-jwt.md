# HU05 - Inicio de sesion con correo y contrasena

**Como** usuario registrado (administrador o empleado)
**Quiero** iniciar sesion en el sistema con mi correo y contrasena
**Para** acceder a los modulos del sistema y, segun mi rol, poder consultar o modificar la informacion.

---

## Contexto

El enunciado describe explicitamente el modulo de inicio de sesion:

> "Este modulo debe permitir a todos los usuarios (Administrador, Empleado) iniciar sesion con su correo electronico y contrasena."

La entidad `Usuario` ya esta disponible (ver `HU04`). Esta historia agrega el endpoint de autenticacion y emite un JWT firmado con el rol del usuario, para que los guards de la siguiente historia (`HU06`) puedan autorizar las operaciones.

## Criterios de aceptacion

```gherkin
Escenario: Login exitoso
  Dado un usuario activo con correo "admin@viveros.co" y contrasena "Admin123"
  Cuando se invoca POST /auth/login con esas credenciales
  Entonces la respuesta es 200
  Y contiene un access_token (JWT) y el rol del usuario
  Y el JWT incluye en el payload el sub (id), correo y rol

Escenario: Credenciales invalidas
  Dado un usuario que existe
  Cuando se invoca POST /auth/login con la contrasena equivocada
  Entonces la respuesta es 401 con un mensaje generico
  Y la respuesta no revela si el correo existe o no

Escenario: Usuario inactivo
  Dado un usuario que existe pero tiene activo=false
  Cuando se invoca POST /auth/login
  Entonces la respuesta es 401 sin importar si la contrasena coincide

Escenario: Correo inexistente
  Dado un correo que no esta registrado
  Cuando se invoca POST /auth/login
  Entonces la respuesta es 401 con el mismo mensaje generico
```

## Tareas tecnicas

- [x] Crear rama `feature/HU05-login-jwt`.
- [x] Instalar `@nestjs/jwt`.
- [x] Crear modulo `auth` con service y controller.
- [x] `AuthService.login(correo, password)` valida credenciales contra bcrypt y emite el token.
- [x] `AuthController` expone `POST /auth/login`.
- [x] Configurar la clave secreta y expiracion via variables de entorno.
- [x] Documentar la ruta en el README.

## Definicion de hecho

- Los escenarios pasan.
- El token expira en un tiempo razonable (default 1h).
- La contrasena nunca aparece en logs ni en la respuesta.
- El secreto del JWT se lee de `JWT_SECRET` con un fallback solo para desarrollo.

## Notas de diseno

- Se prefiere `@nestjs/jwt` solo (sin Passport) para mantener la dependencia minima. La validacion del token se hara con un guard manual en `HU06`.
- El mensaje de error de credenciales es siempre "Credenciales invalidas" para evitar enumeracion de usuarios.
- El payload del JWT incluye `sub`, `correo` y `rol` (este ultimo necesario para `HU06`).
