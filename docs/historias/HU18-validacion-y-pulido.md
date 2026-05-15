# HU18 - Validacion de entradas y pulido del repositorio

**Como** equipo de desarrollo
**Quiero** validar las entradas del API y limpiar el repositorio
**Para** ofrecer mensajes de error claros al frontend en lugar de fallar con 500 cuando el body es incorrecto, y para que el codigo entregado quede prolijo.

---

## Contexto

Los controladores reciben `Partial<...>` o DTOs sin validar; cualquier body raro llega hasta TypeORM. Con `class-validator` + `class-transformer` y un `ValidationPipe` global, el API responde 400 con detalles cuando el payload no cumple los tipos o las reglas, y los DTOs documentan la forma esperada.

Tambien se aprovecha la rama para tareas de higiene:

- Sacar `backend/dist/` del control de versiones (es un artefacto de build).
- Actualizar el README raiz para reflejar el numero de pruebas, los nuevos endpoints y la nueva estructura.
- Anadir un script `lint` consistente entre backend y frontend.

## Criterios de aceptacion

```gherkin
Escenario: Body invalido en login
  Dado un POST /auth/login con body "{ correo: 'no-es-email', password: 12 }"
  Cuando el backend recibe la peticion
  Entonces responde 400 con la lista de validaciones fallidas
  Y NO se intenta consultar la base de datos

Escenario: Body vacio en creacion
  Dado un POST /productores con body "{}"
  Cuando el backend recibe la peticion
  Entonces responde 400 indicando los campos requeridos faltantes

Escenario: Repositorio sin artefactos de build
  Dado el repositorio clonado
  Cuando se inspecciona "backend/" tras `git clean -d`
  Entonces no aparece `dist/` en el arbol de trabajo si no se ha compilado
  Y `backend/dist/` esta en `.gitignore`

Escenario: README al dia
  Dado el README raiz
  Cuando se lee la seccion de pruebas
  Entonces refleja el numero real de tests (50 backend, 6 frontend)
  Y la tabla de endpoints incluye autenticacion y reportes
```

## Tareas tecnicas

- [x] Crear rama `feature/HU18-validacion-y-pulido`.
- [x] Instalar `class-validator` y `class-transformer`.
- [x] Registrar `ValidationPipe` global en `main.ts` con `whitelist` y `transform`.
- [x] Anadir decoradores `@IsString`, `@IsEmail`, `@IsEnum`, etc. a los DTOs criticos (`LoginDto`, `CrearUsuarioDto`, `ActualizarUsuarioDto`).
- [x] Agregar `backend/dist/` al `.gitignore` del backend y removerlo del indice (`git rm -r --cached`).
- [x] Actualizar el README raiz con conteo de tests, endpoints nuevos y estructura actualizada.

## Definicion de hecho

- Las pruebas del backend siguen pasando.
- El build pasa.
- Un POST con body invalido devuelve 400 con detalles.
- El indice de git no rastrea `backend/dist/`.

## Notas de diseno

- Solo se anaden decoradores a los DTOs estrategicos (auth y usuario). Las demas entidades aceptan `Partial<...>` por brevedad, pero la convencion queda lista para extenderse.
- `ValidationPipe` se configura con `whitelist: true` (descarta propiedades no declaradas), `forbidNonWhitelisted: false` (no rompe si llegan extras) y `transform: true` (convierte tipos primitivos).
- El borrado de `backend/dist/` del indice no destruye archivos locales; solo deja de versionarlos.
