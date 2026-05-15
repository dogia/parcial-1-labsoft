# HU13 - CRUD de viveros con nombre, departamento y municipio

**Como** administrador o empleado
**Quiero** una vista de viveros con todos los campos exigidos por el enunciado (codigo, nombre, departamento, municipio, tipo de cultivo)
**Para** ver de un vistazo la informacion completa del cultivo y mantenerla actualizada.

---

## Contexto

HU01 ya agrego al backend los campos `nombre`, `departamento` y `municipio` al Vivero. HU13 los lleva al frontend, anidando la vista bajo el productor y la finca para reflejar la jerarquia y el flujo de navegacion natural.

## Criterios de aceptacion

```gherkin
Escenario: Listado de viveros de una finca
  Dado un productor con una finca que tiene tres viveros
  Cuando el usuario entra a /productores/:doc/fincas/:catastro/viveros
  Entonces ve una tabla con codigo, nombre, departamento, municipio y tipo de cultivo
  Y un boton para crear nuevo vivero (solo ADMIN)

Escenario: Formulario completo de vivero
  Dado un ADMIN
  Cuando crea o edita un vivero
  Entonces el formulario solicita y valida: codigo, nombre, departamento, municipio, tipo de cultivo
```

## Tareas tecnicas

- [x] Crear rama `feature/HU13-viveros-ui`.
- [x] Modelo `Vivero`.
- [x] `ViveroService` con metodos del CRUD anidado a la finca.
- [x] Componentes `ViverosList` y `ViveroForm`.
- [x] Anidar las rutas dentro de la finca.

## Definicion de hecho

- Las pantallas compilan y pasan lint.
- El formulario exige los cinco campos.
- La navegacion encadenada Productor -> Finca -> Vivero funciona.

## Notas

Igual patron a HU11 y HU12. Se mantienen los `input.required` para que las rutas sin parametros fallen explicitamente.
