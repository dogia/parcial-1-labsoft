# HU12 - CRUD de fincas anidadas a productores

**Como** administrador o empleado del sistema
**Quiero** consultar y, si soy administrador, mantener las fincas asociadas a un productor
**Para** organizar territorialmente la informacion del cultivo.

---

## Contexto

El backend mantiene el CRUD de fincas anidado dentro del productor: `/productores/:documento/fincas`. El frontend reflejara la misma estructura para que la navegacion sea predecible: el usuario entra a un productor y desde alli ve sus fincas.

## Criterios de aceptacion

```gherkin
Escenario: Lista de fincas de un productor
  Dado un productor con dos fincas
  Cuando el usuario entra a /productores/:documento/fincas
  Entonces ve la tabla con numero catastro y municipio de cada finca
  Y un boton para crear nueva (solo ADMIN)

Escenario: Crear y editar finca
  Dado un usuario ADMIN
  Cuando crea o edita una finca en /productores/:documento/fincas/...
  Entonces el cambio se persiste y se vuelve a la lista de la finca

Escenario: Empleado solo lectura
  Dado un usuario EMPLEADO
  Cuando entra a la lista
  Entonces no aparecen los botones de crear/editar/eliminar
```

## Tareas tecnicas

- [x] Crear rama `feature/HU12-fincas-ui`.
- [x] Modelo `Finca`.
- [x] `FincaService` con metodos anidados (`findAllByProductor`, `findOne`, `create`, `update`, `remove`).
- [x] Componentes `FincasList` y `FincaForm`.
- [x] Sub-rutas dentro de `productores/:documento/fincas/...`.

## Definicion de hecho

- Lint y build pasan.
- Las vistas consumen el backend real.
- La navegacion encadenada Productor -> Fincas funciona.

## Notas

Se reutiliza el patron de HU11 (lista + formulario con input binding por ruta).
