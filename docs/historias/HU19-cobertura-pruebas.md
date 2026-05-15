# HU19 - Cobertura de pruebas: services, E2E y frontend

**Como** equipo de desarrollo
**Quiero** elevar la cobertura de pruebas mas alla de los tests de entidades
**Para** validar la logica de los services, los flujos completos de la API y los componentes del frontend.

---

## Contexto

Al cerrar HU18 el repositorio tenia 50 pruebas en backend (todas de entidades o relaciones de TypeORM) y 6 en frontend (App + AuthService). Falta validar:

1. La logica de los **services** del backend (productor, finca, vivero, labor, producto-control, usuario, auth).
2. El **flujo end-to-end** del API: que el modulo de Nest se levante, que los guards bloqueen accesos sin token, que el login emita JWT, que las consultas con relaciones devuelvan el detalle esperado.
3. Los **componentes y servicios** del frontend que consumen el API: que los listados rendericen los datos, que el formulario navegue al guardar, que los servicios hagan las peticiones correctas.

Estos tres bloques se cubren en HU19 con tres conjuntos de pruebas:

- `*.service.spec.ts` para cada service del backend, mockeando el repositorio de TypeORM.
- `test/app.e2e-spec.ts` ampliado: arranque del modulo, login, llamadas autorizadas y CRUD basico contra una base SQLite en memoria.
- `*.spec.ts` en el frontend para los services HTTP de cada feature y al menos un componente list por dominio.

## Criterios de aceptacion

```gherkin
Escenario: Tests unitarios de services backend
  Cuando se ejecuta "npm test" en backend
  Entonces el numero de pruebas crece de 50 a >= 90
  Y cada service principal tiene al menos una suite con casos de exito y error

Escenario: Pruebas E2E
  Cuando se ejecuta "npm run test:e2e" en backend
  Entonces el flujo "login -> consultar productores -> crear productor -> obtener detalle" pasa
  Y un acceso sin token devuelve 401
  Y un empleado autenticado obtiene 403 al intentar crear

Escenario: Pruebas frontend
  Cuando se ejecuta "npm test" en frontend
  Entonces el numero de pruebas crece de 6 a >= 20
  Y cada service de feature (productor, finca, vivero, labor, producto-control, reportes) tiene su suite
  Y los componentes list muestran los datos provistos por el mock
```

## Tareas tecnicas

- [x] Crear rama `feature/HU19-cobertura-pruebas`.
- [x] Tests unitarios de services backend (mock del Repository de TypeORM).
- [x] Test E2E con SQLite en memoria que cubre el flujo de login + CRUD basico + autorizacion.
- [x] Tests de los services HTTP del frontend.
- [x] Test de al menos un componente list por feature (smoke test del render).

## Definicion de hecho

- `npm test` en backend y `npm test` en frontend pasan.
- `npm run test:e2e` en backend pasa sin necesidad de PostgreSQL real.
- Lint y build siguen verdes.

## Notas de diseno

- Para los services backend se usa `jest.fn()` directo sobre los metodos del repositorio (sin libs adicionales como `typeorm-mock` o `testcontainers`), siguiendo la convencion ligera del proyecto.
- Las pruebas E2E sustituyen Postgres por SQLite via override del modulo TypeORM en el `Test.createTestingModule`. Esto evita levantar Docker durante CI.
- En el frontend se usa `HttpTestingController` para los services y `TestBed.createComponent` para componentes; nada de `karma`/`cypress`.
