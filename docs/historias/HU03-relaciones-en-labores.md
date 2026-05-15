# HU03 - Detalle del producto de control en la consulta de labores por vivero

**Como** usuario del sistema (administrador o empleado)
**Quiero** que al consultar las labores de un vivero se incluya el detalle del producto de control aplicado (con su sub-tipo plaga / hongo / fertilizante)
**Para** poder revisar de un solo vistazo que se aplico, cuando y de que tipo, sin tener que hacer consultas adicionales.

---

## Contexto

El enunciado de la asignatura especifica:

> "a) Labores ejecutadas en un Vivero (Con el correspondiente detalle de Productos de Control Aplicados)"

La implementacion actual de `LaborService.findAllByVivero` utiliza `findBy` sin cargar relaciones, por lo que el cliente recibe solo el `producto_id` pero no el producto en si, mucho menos su detalle de plaga, hongo o fertilizante. Para cumplir el enunciado y para que la pantalla y los reportes puedan mostrar la informacion en una sola pasada, hay que cargar las relaciones de forma anticipada.

## Criterios de aceptacion

```gherkin
Escenario: Consultar labores de un vivero
  Dado un vivero con dos labores
  Y cada labor usa un producto de control distinto
  Cuando se invoca GET /viveros/:codigo/labores
  Entonces cada labor incluye un objeto producto con sus campos
  Y si el producto es de tipo PLAGA incluye productoControl.controlPlaga
  Y si es HONGO incluye productoControl.controlHongo
  Y si es FERTILIZANTE incluye productoControl.controlFertilizante
  Y solo el sub-tipo correspondiente esta presente (los otros son null)

Escenario: Detalle de una labor
  Dado una labor con id 7
  Cuando se invoca GET /viveros/:codigo/labores/7
  Entonces la respuesta incluye el producto con su sub-tipo
```

## Tareas tecnicas

- [x] Crear rama `feature/HU03-relaciones-en-labores`.
- [x] Cambiar `findAllByVivero` y `findOne` para usar `find` con la opcion `relations`.
- [x] Verificar que el array de relaciones cubre `producto`, `producto.controlPlaga`, `producto.controlHongo`, `producto.controlFertilizante`.
- [x] Mantener el orden de las labores por fecha descendente para que el reporte muestre las mas recientes primero.

## Definicion de hecho

- Las respuestas del endpoint incluyen los objetos relacionados.
- Las pruebas existentes siguen pasando.
- La consulta sigue siendo una sola query (con joins gestionados por TypeORM).

## Notas de diseno

Se utiliza la opcion `relations` del repositorio porque el numero de niveles a cargar es pequeno y conocido. Esta opcion genera internamente un join razonable, ademas de mantener el codigo declarativo. Si en el futuro se requirieran filtros mas complejos, se migrara a `createQueryBuilder`.
