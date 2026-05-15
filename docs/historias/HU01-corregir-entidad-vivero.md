# HU01 - Corregir entidad Vivero

**Como** desarrollador del sistema
**Quiero** que la entidad Vivero contenga los campos exigidos por el enunciado (nombre, departamento y municipio)
**Para** que el modelo refleje fielmente los requisitos del negocio y los reportes muestren la ubicacion correcta de cada vivero.

---

## Contexto

En el modelo actual, `Vivero` posee unicamente `codigo` y `tipo_cultivo`, y el `municipio` esta asignado a la entidad `Finca`. El enunciado de la asignatura es explicito:

> "El Vivero debe poseer un nombre, departamento y municipio donde se encuentra."

Por lo tanto, la ubicacion (departamento + municipio) y el nombre son atributos propios del vivero, no de la finca. La entidad `Finca` puede permanecer como agrupador catastral del proyecto, pero la ubicacion del cultivo debe acompanar al vivero. Esta correccion habilita ademas las consultas y reportes que listan viveros con su ubicacion.

## Criterios de aceptacion

```gherkin
Escenario: Atributos exigidos por el enunciado
  Dado que se modela la entidad Vivero
  Cuando se inspeccionan sus columnas
  Entonces debe incluir nombre, departamento y municipio
  Y todas deben ser obligatorias

Escenario: Crear un vivero con la nueva forma
  Dado un payload { codigo, nombre, departamento, municipio, tipo_cultivo }
  Cuando se invoca POST /fincas/:numeroCatastro/viveros
  Entonces el vivero se persiste con todos los campos
  Y la respuesta los devuelve sin transformaciones

Escenario: Compatibilidad con datos previos
  Dado que existian viveros sin nombre/departamento/municipio
  Cuando se aplique el cambio
  Entonces synchronize de TypeORM agrega las columnas
  Pero el desarrollador entiende que los registros previos requeriran un backfill
```

## Tareas tecnicas

- [x] Crear rama `feature/HU01-corregir-entidad-vivero`.
- [x] Agregar columnas `nombre`, `departamento` y `municipio` a `Vivero`, todas `nullable: false`.
- [x] Actualizar los specs de `vivero.entity.spec.ts` para cubrir los nuevos campos.
- [x] Verificar que las pruebas existentes de relaciones (`relations.spec.ts`) sigan pasando.
- [x] Documentar el cambio.

## Definicion de hecho

- `npm test` en `backend/` pasa.
- La entidad expone los campos exigidos por el enunciado.
- La columna `municipio` permanece en `Finca` (lugar catastral de la propiedad) y se agrega como campo independiente en `Vivero` (lugar del cultivo, eventualmente diferente).
- Los tests de la entidad cubren los nuevos atributos.

## Notas de diseno

Se conserva `Finca.municipio` porque en el codigo actual representa el municipio donde se encuentra la propiedad, lo cual no es contradictorio con que el vivero (cultivo dentro de la finca) tenga su propia ubicacion. En la practica suelen coincidir, pero modelarlos de forma independiente da flexibilidad.

Se mantiene `tipo_cultivo` como atributo adicional util para reportes, aunque no este explicito en el enunciado.
