# HU14 - CRUD de labores con producto de control aplicado

**Como** administrador o empleado
**Quiero** consultar las labores realizadas en un vivero, con el detalle del producto de control aplicado, y administrarlas si soy ADMIN
**Para** mantener un historial de las intervenciones agronomicas y soportar la consulta a del enunciado.

---

## Contexto

El backend `GET /viveros/:codigo/labores` ya carga la labor junto con el producto y su sub-tipo (HU03). Esta historia presenta esa informacion al usuario y permite registrar nuevas labores asociando un producto de control.

## Criterios de aceptacion

```gherkin
Escenario: Listar labores con detalle
  Dado un vivero con labores
  Cuando se entra a /viveros/:codigo/labores
  Entonces se muestra cada labor con fecha, descripcion, producto y un resumen de su sub-tipo
  (carencia, nombre del hongo o fecha de ultima aplicacion segun corresponda)

Escenario: Registrar una labor (ADMIN)
  Dado un usuario ADMIN
  Cuando completa el formulario con fecha, descripcion y producto de control
  Entonces la labor se persiste asociada al vivero actual
  Y al volver a la lista aparece arriba (orden descendente por fecha)
```

## Tareas tecnicas

- [x] Crear rama `feature/HU14-labores-ui`.
- [x] Modelos `Labor` y `ProductoControl` (minimo para el selector).
- [x] `LaborService` y `ProductoControlService` (read-only para el selector).
- [x] Componentes `LaboresList` y `LaborForm`.
- [x] Rutas `/viveros/:codigo/labores`, `/viveros/:codigo/labores/nueva`, `/viveros/:codigo/labores/:id/editar`.
- [x] Mostrar resumen del sub-tipo de producto en la lista.

## Definicion de hecho

- Lint y build pasan.
- La lista muestra los detalles del producto.
- El formulario permite seleccionar el producto desde un listado real.

## Notas

`ProductoControlService.findAll` se reusara en HU15 para el CRUD completo. Aqui solo se necesita read para alimentar el selector.
