import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PDFDocument = require('pdfkit');
import { Vivero } from '../entity/vivero.entity';
import { Labor } from '../entity/labor.entity';
import { LaborService } from '../labor/labor.service';
import { ViveroService } from '../vivero/vivero.service';
import { ProductorService } from '../productor/productor.service';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Vivero)
    private readonly viveroRepository: Repository<Vivero>,
    private readonly laborService: LaborService,
    private readonly viveroService: ViveroService,
    private readonly productorService: ProductorService,
  ) {}

  // Construye un PDF en memoria acumulando los chunks emitidos por pdfkit
  // y devuelve el resultado como Buffer listo para entregar al cliente.
  protected async pdfABuffer(
    builder: (doc: PDFKit.PDFDocument) => void,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      builder(doc);
      doc.end();
    });
  }

  // Carga un vivero junto a su finca y productor; lanza 404 si no existe.
  // Se usa como base para los reportes que necesitan el contexto del vivero.
  protected async cargarViveroConContexto(codigo: string): Promise<Vivero> {
    const vivero = await this.viveroRepository.findOne({
      where: { codigo },
      relations: ['finca', 'finca.productor'],
    });
    if (!vivero) {
      throw new NotFoundException(`Vivero con código ${codigo} no encontrado`);
    }
    return vivero;
  }

  // Devuelve la fecha en formato YYYY-MM-DD, tolerando tanto Date como string.
  protected formatearFecha(valor: Date | string | null | undefined): string {
    if (!valor) {
      return '-';
    }
    const fecha = valor instanceof Date ? valor : new Date(valor);
    if (Number.isNaN(fecha.getTime())) {
      return String(valor);
    }
    return fecha.toISOString().slice(0, 10);
  }

  // Traduce la relacion del sub-tipo de un producto de control a texto humano.
  protected describirSubTipo(labor: Labor): string {
    const producto = labor.producto;
    if (!producto) {
      return '-';
    }
    if (producto.controlPlaga) {
      return `Carencia: ${producto.controlPlaga.periodo_carencia} dias`;
    }
    if (producto.controlHongo) {
      return `Hongo: ${producto.controlHongo.nombre_hongo}`;
    }
    if (producto.controlFertilizante) {
      const fecha = this.formatearFecha(
        producto.controlFertilizante.fecha_ultima_aplicacion,
      );
      return `Ultima aplicacion: ${fecha}`;
    }
    return '-';
  }

  async generarLaboresPorViveroPdf(codigoVivero: string): Promise<Buffer> {
    const vivero = await this.cargarViveroConContexto(codigoVivero);
    const labores = await this.laborService.findAllByVivero(codigoVivero);

    return this.pdfABuffer((doc) => {
      this.dibujarEncabezadoLabores(doc, vivero);
      this.dibujarTablaLabores(doc, labores);
      this.dibujarPiePagina(doc);
    });
  }

  async generarViverosPorProductorPdf(
    documentoProductor: string,
  ): Promise<Buffer> {
    const productor = await this.productorService.findOne(documentoProductor);
    const viveros =
      await this.viveroService.findAllByProductor(documentoProductor);

    return this.pdfABuffer((doc) => {
      this.dibujarEncabezadoViveros(
        doc,
        productor.nombre,
        productor.apellido,
        productor.documento,
      );
      this.dibujarTablaViveros(doc, viveros);
      this.dibujarPiePagina(doc);
    });
  }

  private dibujarEncabezadoViveros(
    doc: PDFKit.PDFDocument,
    nombre: string,
    apellido: string,
    documento: string,
  ): void {
    doc
      .font('Helvetica-Bold')
      .fontSize(18)
      .text(
        `Viveros del productor ${nombre} ${apellido} (documento ${documento})`,
        {
          align: 'left',
        },
      );
    doc.moveDown();
  }

  private dibujarTablaViveros(
    doc: PDFKit.PDFDocument,
    viveros: Vivero[],
  ): void {
    const encabezados = [
      'Codigo',
      'Nombre',
      'Departamento',
      'Municipio',
      'Tipo cultivo',
      'Finca',
    ];
    const anchos = [60, 100, 90, 80, 80, 80];

    this.dibujarFilaEncabezado(doc, encabezados, anchos);

    if (viveros.length === 0) {
      doc.moveDown();
      doc
        .font('Helvetica-Oblique')
        .fontSize(10)
        .text('El productor no tiene viveros asociados.');
      return;
    }

    for (const vivero of viveros) {
      const fila = [
        vivero.codigo,
        vivero.nombre ?? '-',
        vivero.departamento ?? '-',
        vivero.municipio ?? '-',
        vivero.tipo_cultivo ?? '-',
        vivero.finca_id ?? '-',
      ];
      this.dibujarFilaDatos(doc, fila, anchos);
    }
  }

  // ----- Helpers de layout -----

  private dibujarEncabezadoLabores(
    doc: PDFKit.PDFDocument,
    vivero: Vivero,
  ): void {
    doc
      .font('Helvetica-Bold')
      .fontSize(18)
      .text('Reporte de Labores', { align: 'left' });
    doc.moveDown(0.3);

    const productor = vivero.finca?.productor;
    const nombreProductor = productor
      ? `${productor.nombre} ${productor.apellido}`
      : '-';
    const numeroFinca = vivero.finca?.numero_catastro ?? '-';

    doc.font('Helvetica').fontSize(11);
    doc.text(`Vivero: ${vivero.codigo} - ${vivero.nombre}`);
    doc.text(`Ubicacion: ${vivero.departamento}, ${vivero.municipio}`);
    doc.text(`Tipo de cultivo: ${vivero.tipo_cultivo}`);
    doc.text(`Finca: ${numeroFinca}`);
    doc.text(`Productor: ${nombreProductor}`);
    doc.moveDown();
  }

  private dibujarTablaLabores(doc: PDFKit.PDFDocument, labores: Labor[]): void {
    const encabezados = ['Fecha', 'Descripcion', 'Producto', 'Tipo', 'Detalle'];
    const anchos = [70, 150, 100, 70, 110];

    this.dibujarFilaEncabezado(doc, encabezados, anchos);

    if (labores.length === 0) {
      doc.moveDown();
      doc
        .font('Helvetica-Oblique')
        .fontSize(10)
        .text('Sin labores registradas.');
      return;
    }

    for (const labor of labores) {
      const fila = [
        this.formatearFecha(labor.fecha),
        labor.descripcion ?? '-',
        labor.producto?.nombre ?? '-',
        labor.producto?.tipo ?? '-',
        this.describirSubTipo(labor),
      ];
      this.dibujarFilaDatos(doc, fila, anchos);
    }
  }

  protected dibujarFilaEncabezado(
    doc: PDFKit.PDFDocument,
    columnas: string[],
    anchos: number[],
  ): void {
    doc.font('Helvetica-Bold').fontSize(11);
    const y = doc.y;
    let x = doc.page.margins.left;
    columnas.forEach((columna, index) => {
      doc.text(columna, x, y, { width: anchos[index] });
      x += anchos[index];
    });
    doc.moveDown(0.5);
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke();
    doc.moveDown(0.3);
  }

  protected dibujarFilaDatos(
    doc: PDFKit.PDFDocument,
    columnas: string[],
    anchos: number[],
  ): void {
    doc.font('Helvetica').fontSize(10);
    const y = doc.y;
    let x = doc.page.margins.left;
    let alturaMaxima = 0;
    columnas.forEach((columna, index) => {
      doc.text(columna, x, y, { width: anchos[index] });
      const alturaCelda = doc.heightOfString(columna, { width: anchos[index] });
      if (alturaCelda > alturaMaxima) {
        alturaMaxima = alturaCelda;
      }
      x += anchos[index];
    });
    doc.y = y + alturaMaxima + 4;
    doc.x = doc.page.margins.left;
  }

  protected dibujarPiePagina(doc: PDFKit.PDFDocument): void {
    const fechaGeneracion = this.formatearFecha(new Date());
    doc.moveDown(2);
    doc
      .font('Helvetica-Oblique')
      .fontSize(9)
      .text(`Generado el ${fechaGeneracion}`, {
        align: 'right',
      });
  }
}
