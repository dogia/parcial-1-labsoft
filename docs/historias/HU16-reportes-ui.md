# HU16 - Pantalla de reportes con descarga en PDF y Excel

**Como** administrador o empleado
**Quiero** una pantalla de reportes donde pueda elegir el vivero o el productor y descargar el informe en PDF o Excel
**Para** poder generar y compartir la informacion exigida por las consultas a y b del enunciado.

---

## Contexto

Los endpoints de exportacion existen en el backend (`HU07` y `HU08`). Esta historia cierra el ciclo en el frontend agregando una pantalla `/reportes` con dos secciones:

1. **Labores por vivero**: selector de vivero (cargado de la lista global) + botones de descarga PDF y Excel.
2. **Viveros por productor**: selector de productor + botones de descarga PDF y Excel.

Las descargas se hacen via `HttpClient` con `responseType: 'blob'` para que el interceptor adjunte el JWT, y luego se genera una URL temporal para disparar el download en el navegador.

## Criterios de aceptacion

```gherkin
Escenario: Descargar labores de un vivero en PDF
  Dado un usuario autenticado en /reportes
  Cuando selecciona un vivero y pulsa "Descargar PDF"
  Entonces el navegador descarga un archivo PDF con el reporte de labores

Escenario: Descargar viveros de un productor en Excel
  Dado el mismo usuario en /reportes
  Cuando selecciona un productor y pulsa "Descargar Excel"
  Entonces el navegador descarga un archivo .xlsx

Escenario: Sin seleccion no se permite descargar
  Dado el usuario en /reportes
  Cuando aun no ha seleccionado vivero o productor
  Entonces los botones de descarga estan deshabilitados

Escenario: Acceso desde la home
  Dado un usuario autenticado en /
  Entonces ve una tarjeta "Reportes" que lleva a /reportes
```

## Tareas tecnicas

- [x] Crear rama `feature/HU16-reportes-ui`.
- [x] `ReportesService` (frontend) con metodos para descargar blobs PDF/Excel.
- [x] Componente `Reportes` con dos tarjetas (labores por vivero, viveros por productor).
- [x] Selector de vivero alimentado por todas las fincas de todos los productores (o la lista global).
- [x] Selector de productor alimentado por `ProductorService`.
- [x] Disparo de descarga con `URL.createObjectURL` y un `<a>` temporal.
- [x] Acceso desde la home.

## Definicion de hecho

- Lint y build pasan.
- Las descargas funcionan en navegadores modernos.
- Los botones se deshabilitan cuando no hay seleccion.

## Notas de diseno

- Se evita una "ruta" diferente por entidad seleccionada: la pantalla recibe la seleccion en signals locales y compone la URL del backend dinamicamente.
- El nombre del archivo descargado se toma del header `Content-Disposition` cuando esta disponible, con un fallback al patron `<tipo>-<id>.<ext>`.
