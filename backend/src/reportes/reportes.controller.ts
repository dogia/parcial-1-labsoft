import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('viveros/:codigo/labores/pdf')
  async laboresPorViveroPdf(
    @Param('codigo') codigo: string,
  ): Promise<StreamableFile> {
    const buffer =
      await this.reportesService.generarLaboresPorViveroPdf(codigo);
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="labores-${codigo}.pdf"`,
    });
  }

  @Get('productores/:documento/viveros/pdf')
  async viverosPorProductorPdf(
    @Param('documento') documento: string,
  ): Promise<StreamableFile> {
    const buffer =
      await this.reportesService.generarViverosPorProductorPdf(documento);
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="viveros-productor-${documento}.pdf"`,
    });
  }
}
