import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vivero } from '../entity/vivero.entity';
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

  async generarLaboresPorViveroPdf(_codigoVivero: string): Promise<Buffer> {
    // La implementacion concreta se agrega en commits posteriores.
    throw new Error('No implementado');
  }

  async generarViverosPorProductorPdf(_documentoProductor: string): Promise<Buffer> {
    // La implementacion concreta se agrega en commits posteriores.
    throw new Error('No implementado');
  }
}
