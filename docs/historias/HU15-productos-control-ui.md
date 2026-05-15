# HU15 - CRUD de productos de control con sub-formularios por tipo

**Como** administrador
**Quiero** registrar y mantener los productos de control (plaga, hongo y fertilizante) junto con sus atributos especificos
**Para** que las labores puedan asociar el producto correcto y los reportes muestren el detalle exigido por el enunciado.

---

## Contexto

El enunciado define tres tipos de productos de control:

- **Plaga**: periodo de carencia.
- **Hongo**: periodo de carencia + nombre del hongo.
- **Fertilizante**: fecha de la ultima aplicacion.

En el backend, cada sub-tipo es una entidad separada (`ControlPlaga`, `ControlHongo`, `ControlFertilizante`) con FK al `ProductoControl`. Para que esta vista pueda mostrar el detalle al editar y para que los reportes lo incluyan, se carga ademas la relacion en `ProductoControlService.find*` del backend.

## Criterios de aceptacion

```gherkin
Escenario: Listar productos de control con detalle del sub-tipo
  Dado tres productos (uno por tipo) registrados
  Cuando un usuario entra a /productos-control
  Entonces se muestran nombre, registro ICA, frecuencia, valor, tipo
  Y un resumen del sub-tipo (carencia, hongo o fecha)

Escenario: Crear producto plaga
  Dado un ADMIN
  Cuando completa el formulario con tipo=PLAGA y los campos base + periodo_carencia
  Entonces se crea el ProductoControl
  Y se crea el ControlPlaga asociado con el mismo id

Escenario: Cambiar el tipo al editar
  Dado un producto existente de tipo HONGO
  Cuando el ADMIN cambia el tipo a FERTILIZANTE
  Y guarda
  Entonces se actualiza el tipo y se persiste el nuevo sub-tipo (con migracion manual de datos)

Escenario: Empleado solo lectura
  Dado un usuario EMPLEADO
  Cuando entra a /productos-control
  Entonces no aparecen botones de crear/editar/eliminar
```

## Tareas tecnicas

- [x] Crear rama `feature/HU15-productos-control-ui`.
- [x] Backend: `ProductoControlService.find*` carga las relaciones `controlPlaga`, `controlHongo`, `controlFertilizante`.
- [x] Frontend: componente `ProductosControlList` con tabla detallada.
- [x] Frontend: componente `ProductoControlForm` con sub-formularios condicionales segun `tipo`.
- [x] Acceso a `/productos-control` desde la home.

## Definicion de hecho

- Lint y build pasan en frontend.
- Las pruebas del backend siguen pasando despues del cambio en relaciones.
- La lista muestra el detalle del sub-tipo.
- El formulario coordina la creacion/actualizacion del producto base y su sub-tipo.

## Notas de diseno

- Para evitar inconsistencias, al cambiar el `tipo` durante una edicion no se borra automaticamente el sub-tipo previo (eso queda como mejora futura: requiere DELETE adicional). Se documenta como advertencia.
- El formulario usa el patron de `formGroup.get('tipo').valueChanges` para mostrar/ocultar los campos especificos.
- Si en una edicion el sub-tipo aun no existe (por ejemplo, producto creado antes de esta vista), se crea con POST en lugar de PUT al guardar.
