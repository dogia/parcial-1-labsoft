# HU11 - CRUD de productores en el frontend

**Como** administrador o empleado del sistema
**Quiero** una pantalla donde se vean los productores registrados, con la posibilidad de crear, editar y eliminar (segun mi rol)
**Para** mantener actualizada la base de productores agricolas que utilizan el sistema.

---

## Contexto

El backend ya expone el CRUD completo en `/productores` y la convencion de autorizacion (HU06) restringe la escritura al rol `ADMIN`. Esta historia trae al frontend la primera de las cinco vistas de administracion. Sirve ademas como referencia de estilo para HU12-HU15 (mismo patron lista + formulario, mismas convenciones de carpetas y servicios).

## Criterios de aceptacion

```gherkin
Escenario: Lista de productores
  Dado un usuario autenticado
  Cuando entra a /productores
  Entonces ve una tabla con documento, nombre, apellido, correo y telefono
  Y un boton "Nuevo productor" disponible solo para ADMIN

Escenario: Crear productor (ADMIN)
  Dado un usuario con rol ADMIN
  Cuando completa el formulario en /productores/nuevo
  Y envia los datos validos
  Entonces el productor se persiste y se vuelve a la lista
  Y el nuevo registro aparece en la tabla

Escenario: Editar productor (ADMIN)
  Dado un productor existente
  Cuando el ADMIN abre /productores/:documento/editar
  Y modifica algun campo y guarda
  Entonces el cambio se persiste y se vuelve a la lista

Escenario: Eliminar productor (ADMIN)
  Dado un productor existente
  Cuando el ADMIN confirma la eliminacion desde la lista
  Entonces el productor desaparece de la tabla

Escenario: Empleado no puede modificar
  Dado un usuario con rol EMPLEADO
  Cuando navega a /productores
  Entonces ve la lista, pero no aparecen los botones de "Nuevo", "Editar" ni "Eliminar"
```

## Tareas tecnicas

- [x] Crear rama `feature/HU11-productores-ui`.
- [x] Modelo `Productor` en `core/models/`.
- [x] `ProductorService` en `features/productores/` con `findAll`, `findOne`, `create`, `update`, `remove`.
- [x] Componente `ProductoresList` con tabla y botones contextuales por rol.
- [x] Componente `ProductorForm` reusable para crear y editar.
- [x] Rutas hijas: `/productores` (lista), `/productores/nuevo`, `/productores/:documento/editar`.
- [x] Lazy loading de la feature.
- [x] Acceso al modulo desde el Home.

## Definicion de hecho

- Las pantallas compilan y pasan lint.
- La lista y el detalle consultan el backend real.
- Los botones de escritura solo aparecen para ADMIN.
- Existe confirmacion antes de eliminar.

## Notas de diseno

- El servicio se queda en la carpeta de la feature y no en `core/`, porque solo se usa aqui.
- El formulario es un componente standalone que recibe (via input signal) el productor a editar; si no llega ninguno, opera como creacion.
- La eliminacion se confirma con `window.confirm` por simplicidad. Un dialogo bonito puede venir despues.
