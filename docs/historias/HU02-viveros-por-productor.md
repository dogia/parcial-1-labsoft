# HU02 - Lista de viveros que pertenecen a un productor

**Como** usuario del sistema (administrador o empleado)
**Quiero** consultar todos los viveros que pertenecen a un productor especifico
**Para** conocer la totalidad del cultivo gestionado por ese productor, sin importar en cuantas fincas lo distribuya.

---

## Contexto

El enunciado exige expresamente la consulta:

> "b) Lista de Viveros que pertenecen a un Productor."

Actualmente, las rutas existentes permiten listar viveros **por finca** (`GET /fincas/:numeroCatastro/viveros`), pero no agregar la informacion **por productor**. Dado que un productor puede tener varias fincas y cada finca varios viveros, hace falta una ruta que recorra la cadena `Productor -> Finca -> Vivero` y devuelva todos sus viveros.

## Criterios de aceptacion

```gherkin
Escenario: Consultar viveros de un productor existente
  Dado un productor con documento "1088123456" y dos fincas
  Y la primera finca tiene 2 viveros y la segunda 1
  Cuando se invoca GET /productores/1088123456/viveros
  Entonces la respuesta debe contener los 3 viveros
  Y cada elemento debe incluir codigo, nombre, departamento, municipio y finca_id

Escenario: Productor sin viveros
  Dado un productor que existe pero no tiene fincas (o sus fincas no tienen viveros)
  Cuando se invoca GET /productores/<documento>/viveros
  Entonces la respuesta es 200 con un arreglo vacio

Escenario: Productor inexistente
  Dado un documento que no corresponde a ningun productor
  Cuando se invoca GET /productores/<documento>/viveros
  Entonces la respuesta debe ser 404 con un mensaje claro
```

## Tareas tecnicas

- [x] Crear rama `feature/HU02-viveros-por-productor`.
- [x] Agregar metodo `findViverosByProductor(documento)` en `ProductorService` que use un query builder o `Repository.find` con `relations`.
- [x] Exponer la ruta `GET /productores/:documento/viveros` en `ProductorController`.
- [x] Validar que el productor existe (lanzar `NotFoundException` cuando no).
- [x] Documentar el endpoint en el README raiz.

## Definicion de hecho

- El endpoint responde con el agregado correcto.
- Las pruebas existentes continuan pasando.
- La consulta es eficiente: usa una sola query con joins, no consultas en cascada.

## Notas de diseno

- La consulta se implementa sobre el repositorio de `Vivero` filtrando por `finca.productor_id`, lo que evita cargar primero todas las fincas y luego sus viveros.
- Se reutiliza el patron de rutas anidadas ya presente en el proyecto (las fincas estan bajo `/productores/:documento/fincas`).
