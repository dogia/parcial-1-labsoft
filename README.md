# Sistema para la Administracion de Viveros

**Universidad Tecnologica de Pereira**
**Laboratorio de Software**

**Docente:** Alejandro Rodas

**Presentado por:**
- Felipe Gutierrez
- Samuel Santa
- Daniel Osorio
- Miguel A. Gomez

---

## Descripcion del Proyecto

Sistema orientado a llevar un registro de Productores, sus Fincas, Viveros, las Labores realizadas y los Productos de Control aplicados (plagas, hongos y fertilizantes) en el contexto de la actividad agricola.

Desarrollado con **NestJS** como framework backend, **TypeORM** como ORM y **PostgreSQL** como base de datos.

---

## Modelo de Entidades

El sistema cuenta con 8 entidades relacionadas:

```
Productor (1) ──── (N) Finca (1) ──── (N) Vivero (1) ──── (N) Labor (N) ──── (1) ProductoControl
                                                                                        │
                                                                          ┌──────────────┼──────────────┐
                                                                          │              │              │
                                                                    ControlPlaga   ControlHongo  ControlFertilizante
                                                                       (1:1)          (1:1)           (1:1)
```

| Entidad | Clave Primaria | Descripcion |
|---|---|---|
| **Productor** | `documento` (string) | Identificacion del productor agricola |
| **Finca** | `numero_catastro` (string) | Propiedad del productor |
| **Vivero** | `codigo` (string) | Cultivo dentro de una finca |
| **Labor** | `id` (autoincrement) | Actividad realizada en un vivero |
| **ProductoControl** | `id` (autoincrement) | Producto aplicado en una labor |
| **ControlPlaga** | `id` (FK a ProductoControl) | Detalle para productos tipo plaga |
| **ControlHongo** | `id` (FK a ProductoControl) | Detalle para productos tipo hongo |
| **ControlFertilizante** | `id` (FK a ProductoControl) | Detalle para productos tipo fertilizante |

Los diagramas UML y entidad-relacion se encuentran en la carpeta `docs/`.

---

## Tecnologias Utilizadas

| Tecnologia | Version | Proposito |
|---|---|---|
| Node.js | 20 | Runtime |
| NestJS | 11 | Framework backend |
| TypeORM | 0.3 | ORM |
| PostgreSQL | 16 | Base de datos |
| Jest | 30 | Pruebas unitarias |
| Docker | - | Contenedorizacion |

---

## Requisitos Previos

- Node.js >= 20
- PostgreSQL >= 16 (o Docker)

---

## Instalacion y Ejecucion

### Opcion 1: Local

```bash
cd backend
npm install
```

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE viveros_db;
```

Ejecutar en modo desarrollo:

```bash
npm run start:dev
```

### Opcion 2: Docker

```bash
cd backend
docker-compose up --build
```

Esto levanta PostgreSQL y la aplicacion NestJS automaticamente.

---

## Ejecucion de Pruebas

```bash
cd backend
npm test
```

El proyecto cuenta con **45 pruebas unitarias**:

- **24 pruebas** de entidades (3 por cada una de las 8 entidades)
- **21 pruebas** de relaciones entre entidades

Las pruebas de relaciones utilizan una base de datos SQLite en memoria para verificar los metadatos de TypeORM sin necesidad de PostgreSQL.

---

## Tabla de Endpoints

La API expone rutas anidadas que reflejan las relaciones entre entidades. Todas las respuestas son en formato JSON.

### Productores

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productores` | Listar todos los productores |
| `GET` | `/productores/:documento` | Obtener detalle de un productor |
| `POST` | `/productores` | Crear un nuevo productor |
| `PUT` | `/productores/:documento` | Actualizar un productor |
| `DELETE` | `/productores/:documento` | Eliminar un productor |

### Fincas (anidado en Productores)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productores/:documento/fincas` | Listar fincas del productor |
| `GET` | `/productores/:documento/fincas/:numeroCatastro` | Obtener detalle de una finca |
| `POST` | `/productores/:documento/fincas` | Crear una finca para el productor |
| `PUT` | `/productores/:documento/fincas/:numeroCatastro` | Actualizar una finca |
| `DELETE` | `/productores/:documento/fincas/:numeroCatastro` | Eliminar una finca |

### Viveros (anidado en Fincas)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/fincas/:numeroCatastro/viveros` | Listar viveros de la finca |
| `GET` | `/fincas/:numeroCatastro/viveros/:codigo` | Obtener detalle de un vivero |
| `POST` | `/fincas/:numeroCatastro/viveros` | Crear un vivero en la finca |
| `PUT` | `/fincas/:numeroCatastro/viveros/:codigo` | Actualizar un vivero |
| `DELETE` | `/fincas/:numeroCatastro/viveros/:codigo` | Eliminar un vivero |

### Labores (anidado en Viveros)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/viveros/:codigo/labores` | Listar labores del vivero |
| `GET` | `/viveros/:codigo/labores/:id` | Obtener detalle de una labor |
| `POST` | `/viveros/:codigo/labores` | Crear una labor en el vivero |
| `PUT` | `/viveros/:codigo/labores/:id` | Actualizar una labor |
| `DELETE` | `/viveros/:codigo/labores/:id` | Eliminar una labor |

### Productos de Control

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productos-control` | Listar todos los productos de control |
| `GET` | `/productos-control/:id` | Obtener detalle de un producto |
| `POST` | `/productos-control` | Crear un producto de control |
| `PUT` | `/productos-control/:id` | Actualizar un producto |
| `DELETE` | `/productos-control/:id` | Eliminar un producto |

### Control de Plagas (anidado en Productos de Control)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productos-control/:productoId/control-plaga` | Obtener control de plaga |
| `POST` | `/productos-control/:productoId/control-plaga` | Crear control de plaga |
| `PUT` | `/productos-control/:productoId/control-plaga` | Actualizar control de plaga |
| `DELETE` | `/productos-control/:productoId/control-plaga` | Eliminar control de plaga |

### Control de Hongos (anidado en Productos de Control)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productos-control/:productoId/control-hongo` | Obtener control de hongo |
| `POST` | `/productos-control/:productoId/control-hongo` | Crear control de hongo |
| `PUT` | `/productos-control/:productoId/control-hongo` | Actualizar control de hongo |
| `DELETE` | `/productos-control/:productoId/control-hongo` | Eliminar control de hongo |

### Control de Fertilizantes (anidado en Productos de Control)

| Verbo | Ruta | Accion |
|---|---|---|
| `GET` | `/productos-control/:productoId/control-fertilizante` | Obtener control de fertilizante |
| `POST` | `/productos-control/:productoId/control-fertilizante` | Crear control de fertilizante |
| `PUT` | `/productos-control/:productoId/control-fertilizante` | Actualizar control de fertilizante |
| `DELETE` | `/productos-control/:productoId/control-fertilizante` | Eliminar control de fertilizante |

---

## Estructura del Proyecto

```
backend/
├── src/
│   ├── entity/                          # Entidades del ORM
│   │   ├── productor.entity.ts
│   │   ├── finca.entity.ts
│   │   ├── vivero.entity.ts
│   │   ├── labor.entity.ts
│   │   ├── producto-control.entity.ts
│   │   ├── control-plaga.entity.ts
│   │   ├── control-hongo.entity.ts
│   │   ├── control-fertilizante.entity.ts
│   │   ├── productor.entity.spec.ts     # Tests unitarios
│   │   ├── finca.entity.spec.ts
│   │   ├── vivero.entity.spec.ts
│   │   ├── labor.entity.spec.ts
│   │   ├── producto-control.entity.spec.ts
│   │   ├── control-plaga.entity.spec.ts
│   │   ├── control-hongo.entity.spec.ts
│   │   ├── control-fertilizante.entity.spec.ts
│   │   └── relations.spec.ts           # Tests de relaciones
│   ├── productor/                       # Modulo, controlador y servicio
│   ├── finca/
│   ├── vivero/
│   ├── labor/
│   ├── producto-control/
│   ├── control-plaga/
│   ├── control-hongo/
│   ├── control-fertilizante/
│   ├── app.module.ts
│   └── main.ts
├── docs/                                # Diagramas UML y ER
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## Configuracion de Base de Datos

La conexion se configura mediante variables de entorno:

| Variable | Valor por defecto | Descripcion |
|---|---|---|
| `DB_HOST` | `localhost` | Host de PostgreSQL |
| `DB_PORT` | `5432` | Puerto de PostgreSQL |
| `DB_USERNAME` | `postgres` | Usuario de la base de datos |
| `DB_PASSWORD` | `postgres` | Contrasena de la base de datos |
| `DB_NAME` | `viveros_db` | Nombre de la base de datos |

Las tablas se crean automaticamente al iniciar la aplicacion (`synchronize: true`).
