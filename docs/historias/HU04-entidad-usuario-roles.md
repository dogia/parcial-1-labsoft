# HU04 - Entidad Usuario y roles

**Como** administrador del sistema
**Quiero** registrar usuarios con roles diferenciados (ADMIN y EMPLEADO)
**Para** controlar quien puede crear/modificar/eliminar informacion y quien solo puede consultarla.

---

## Contexto

El sistema de administracion de viveros requiere autenticacion y autorizacion para limitar las operaciones disponibles segun el perfil de cada persona que lo utiliza. Los administradores deben poder gestionar la informacion maestra (productores, fincas, viveros, labores y controles) mientras que los empleados solo deben tener acceso de consulta. Antes de implementar el flujo de inicio de sesion y los guards correspondientes, es necesario modelar la entidad `Usuario` con sus atributos basicos y un enum de roles. Esta historia es el primer paso del paquete de autenticacion: define la entidad, su persistencia, las operaciones CRUD basicas y el hashing seguro de la contrasena.

## Criterios de aceptacion

```gherkin
Escenario: Crear un usuario nuevo
  Dado que un administrador envia los datos correo, nombre, password y rol
  Cuando se invoque el endpoint POST /usuarios
  Entonces se debe crear un usuario nuevo en la base de datos
  Y la respuesta no debe incluir el hash de la contrasena

Escenario: La contrasena se almacena hasheada
  Dado que se crea un usuario con password "secreto123"
  Cuando se consulte el registro persistido en la tabla usuario
  Entonces el campo password_hash debe ser distinto del texto plano
  Y debe corresponder a un hash valido generado con bcrypt

Escenario: El correo debe ser unico
  Dado que ya existe un usuario con correo "admin@viveros.co"
  Cuando se intente crear otro usuario con el mismo correo
  Entonces el servicio debe responder con un conflicto (ConflictException)
  Y no debe persistirse un segundo registro

Escenario: Rol valido del enum
  Dado que el dominio define los roles ADMIN y EMPLEADO
  Cuando se cree un usuario con cualquiera de esos valores
  Entonces la operacion debe completarse exitosamente
  Y el valor del rol debe almacenarse como una cadena del enum RolUsuario

Escenario: Eliminar un usuario existente
  Dado que existe un usuario con un id conocido
  Cuando se invoque DELETE /usuarios/:id
  Entonces el registro debe eliminarse de la base de datos
  Y una nueva consulta por ese id debe lanzar NotFoundException

Escenario: Listar usuarios sin exponer el hash
  Dado que hay varios usuarios registrados
  Cuando se invoque GET /usuarios
  Entonces se debe devolver la lista completa
  Y ningun elemento debe contener el campo passwordHash
```

## Tareas tecnicas

- [x] Crear rama `feature/HU04-entidad-usuario-roles`.
- [x] Documentar la historia en `docs/historias/HU04-entidad-usuario-roles.md`.
- [x] Agregar dependencia `bcrypt` y los tipos `@types/bcrypt` en el backend.
- [x] Definir `RolUsuario` y la entidad `Usuario` en `backend/src/entity/usuario.entity.ts`.
- [x] Escribir pruebas unitarias para la entidad `Usuario`.
- [x] Implementar el modulo `UsuarioModule` con `UsuarioService`, `UsuarioController` y DTOs.
- [x] Hashear la contrasena con `bcrypt` al crear y actualizar usuarios.
- [x] Registrar `UsuarioModule` en `AppModule`.
- [x] Verificar que `npm test` y `npm run build` pasan correctamente.

## Definicion de hecho

- La entidad `Usuario` esta mapeada a la tabla `usuario` con todas las columnas requeridas.
- El enum `RolUsuario` esta definido y se utiliza tanto en la entidad como en los DTOs.
- Las pruebas unitarias de la entidad pasan junto con el resto de la suite existente.
- El endpoint POST crea usuarios con contrasena hasheada y rechaza correos duplicados.
- Las respuestas de los endpoints nunca exponen el campo `passwordHash`.
- El backend compila (`npm run build`) sin errores.

## Notas de diseno

- **Enum nativo de Postgres**: se utiliza el tipo `enum` en TypeORM porque garantiza a nivel de base de datos que solo se almacenen valores validos, evita errores de tipeo y deja el dominio explicito en el modelo.
- **bcrypt con 10 rounds**: es el balance estandar entre seguridad y rendimiento para hashing de contrasenas. Se prefiere sobre alternativas como md5 o sha256 porque incluye salt y es resistente a ataques de fuerza bruta.
- **UUID como llave primaria**: a diferencia de las otras entidades del dominio (que usan claves naturales como documento o codigo), los usuarios no tienen un identificador externo natural y un id autogenerado evita exponer el correo en la URL.
- **Mapeo manual sin DTO de salida**: para mantener la simplicidad del proyecto y siguiendo el patron de los otros servicios, el `UsuarioService` filtra el campo `passwordHash` directamente al devolver el resultado en lugar de introducir una clase adicional.
- **Sin `class-validator` en esta historia**: el proyecto aun no incluye esa libreria; la validacion semantica (por ejemplo, formato del correo) se abordara cuando se integre el `ValidationPipe` global como tarea transversal.
