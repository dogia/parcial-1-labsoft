# HU07 - Exportacion de reportes a PDF

**Como** administrador o empleado
**Quiero** descargar los reportes en PDF
**Para** compartir y archivar la informacion fuera del sistema.

---

## Contexto

El enunciado del proyecto indica explicitamente la necesidad de exportar los informes generados por el sistema:

> "Todos los usuarios podran exportar todos los informes a PDF y Excel."

Las consultas relevantes ya estan implementadas en el backend: las labores realizadas en un vivero (`GET /viveros/:codigo/labores`) y los viveros que pertenecen a un productor (`GET /productores/:documento/viveros`). Esta historia agrega un modulo `reportes` que reutiliza los servicios existentes para producir los archivos PDF a descargar. La exportacion a Excel queda fuera del alcance de HU07 y se cubrira en otra historia.

## Criterios de aceptacion

```gherkin
Escenario: PDF de labores realizadas en un vivero
  Dado un vivero con codigo "VIV-001" que tiene labores registradas
  Cuando se invoca GET /reportes/viveros/VIV-001/labores/pdf
  Entonces la respuesta debe ser 200
  Y el cuerpo debe ser un archivo PDF descargable
  Y el archivo debe listar las labores con su fecha, descripcion, producto y detalle del sub-tipo

Escenario: PDF de viveros pertenecientes a un productor
  Dado un productor con documento "1088123456" que tiene viveros asociados
  Cuando se invoca GET /reportes/productores/1088123456/viveros/pdf
  Entonces la respuesta debe ser 200
  Y el cuerpo debe ser un archivo PDF descargable
  Y el archivo debe listar los viveros con codigo, nombre, departamento, municipio, tipo de cultivo y finca

Escenario: Encabezados de descarga correctos
  Dado cualquier ruta de exportacion de reportes a PDF
  Cuando la respuesta llega al cliente
  Entonces el header Content-Type debe ser "application/pdf"
  Y el header Content-Disposition debe indicar "attachment" con un nombre de archivo coherente

Escenario: Recurso inexistente
  Dado un codigo de vivero o documento de productor que no esta registrado
  Cuando se invoca el endpoint de exportacion correspondiente
  Entonces la respuesta debe ser 404 con un mensaje claro
  Y no se debe generar ningun PDF
```

## Tareas tecnicas

- [x] Crear rama `feature/HU07-exportar-pdf`.
- [x] Agregar dependencia `pdfkit` y los tipos `@types/pdfkit`.
- [x] Crear modulo `reportes` con su `ReportesService` y `ReportesController`.
- [x] Implementar `generarLaboresPorViveroPdf(codigoVivero)` reutilizando `ViveroService`, `ProductorService` y `LaborService`.
- [x] Implementar `generarViverosPorProductorPdf(documentoProductor)` reutilizando `ProductorService` y `ViveroService`.
- [x] Exponer `GET /reportes/viveros/:codigo/labores/pdf` y `GET /reportes/productores/:documento/viveros/pdf` devolviendo `StreamableFile`.
- [x] Registrar `ReportesModule` en `AppModule`.
- [x] Documentar los endpoints en el README raiz.

## Definicion de hecho

- Los cuatro escenarios pasan en el comportamiento del backend.
- Las pruebas existentes siguen pasando y `npm run build` termina sin errores.
- El PDF se genera en memoria y se envia como `StreamableFile`, sin escribir archivos temporales en disco.
- Si el vivero o el productor no existen se devuelve 404 antes de iniciar la construccion del PDF.

## Notas de diseno

- **pdfkit** se elige sobre alternativas como `puppeteer` o `html-pdf` porque no requiere instalar un navegador headless ni dependencias nativas pesadas; basta con un paquete Node puro. Esto mantiene la imagen Docker liviana y el tiempo de instalacion de `npm install` corto.
- El PDF se construye con el patron *stream a buffer*: se acumulan los chunks emitidos por el documento (`doc.on('data')`) y al terminar (`doc.on('end')`) se resuelve la promesa con un `Buffer` que se entrega al controlador. Asi se evita exponer el stream al cliente y se simplifica la firma del servicio.
- El layout es deliberadamente simple: titulo, subtitulo con metadatos de contexto, una tabla con encabezado en negrita, las filas debajo y un pie con la fecha de generacion. No se introducen graficos ni hojas de estilo adicionales.
- Se usa la fuente embebida por defecto (`Helvetica`) de pdfkit, que ya viene incluida en el paquete; asi se evita el riesgo de paquetes externos de tipografia y se mantiene la portabilidad entre entornos.
- El detalle del sub-tipo del producto (plaga, hongo o fertilizante) se resuelve en runtime inspeccionando cual de las relaciones (`controlPlaga`, `controlHongo`, `controlFertilizante`) viene poblada en cada labor, y se traduce a una linea humana del estilo "Carencia: 7 dias", "Hongo: Roya" o "Ultima aplicacion: 2026-01-15".
- El controlador devuelve `StreamableFile`, que es la primitiva oficial de NestJS para enviar binarios; ella misma fija los headers `Content-Type` y `Content-Disposition` sin necesidad de manipular el objeto `Response` de Express.
- La autorizacion se hereda del `JwtAuthGuard` global ya activo desde HU06: cualquier usuario autenticado (administrador o empleado) puede descargar los reportes, en linea con el enunciado.
