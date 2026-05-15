# HU08 - Exportacion de reportes a Excel

**Como** administrador o empleado
**Quiero** descargar los reportes en formato Excel (xlsx)
**Para** poder filtrar y manipular los datos en una hoja de calculo despues de descargarlos.

---

## Contexto

El enunciado obliga a ofrecer las consultas en PDF **y** Excel:

> "Todos los usuarios podran exportar todos los informes a PDF y Excel."

HU07 ya entrego la exportacion en PDF. Esta historia agrega los endpoints equivalentes en formato Excel, reutilizando el mismo modulo `Reportes` y la misma estrategia de inyeccion de servicios para no duplicar logica.

## Criterios de aceptacion

```gherkin
Escenario: Descargar labores en Excel
  Dado un vivero existente con labores registradas
  Cuando se invoca GET /reportes/viveros/:codigo/labores/excel
  Entonces la respuesta tiene content-type "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  Y el archivo descargado contiene una hoja con las labores y sus productos

Escenario: Descargar viveros en Excel
  Dado un productor con viveros
  Cuando se invoca GET /reportes/productores/:documento/viveros/excel
  Entonces la respuesta es un archivo xlsx valido con los viveros listados

Escenario: Vivero o productor inexistente
  Dado un codigo o documento que no existe
  Cuando se invoca el endpoint Excel
  Entonces la respuesta es 404
```

## Tareas tecnicas

- [x] Crear rama `feature/HU08-exportar-excel`.
- [x] Instalar `exceljs`.
- [x] Anadir `generarLaboresPorViveroExcel` y `generarViverosPorProductorExcel` en `ReportesService`.
- [x] Anadir endpoints `/reportes/.../excel` en `ReportesController`.
- [x] Actualizar el README con las rutas nuevas.

## Definicion de hecho

- Los archivos se generan en `.xlsx` y son aceptados por Microsoft Excel y LibreOffice Calc.
- Las pruebas existentes pasan.
- El build pasa sin advertencias.

## Notas de diseno

- Se elige `exceljs` por su API streaming-friendly y porque no depende de Office Open XML libraries de pago.
- Se genera el buffer en memoria con `workbook.xlsx.writeBuffer()`; la cantidad de filas esperada es baja (<5k) para los reportes del enunciado.
- Se reutilizan los mismos metodos `cargarViveroConContexto`, `formatearFecha`, `describirSubTipo` del PDF para mantener consistencia entre formatos.
