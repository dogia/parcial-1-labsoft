import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Labor } from '../entity/labor.entity';

const LABOR_RELATIONS = [
  'producto',
  'producto.controlPlaga',
  'producto.controlHongo',
  'producto.controlFertilizante',
];

@Injectable()
export class LaborService {
  constructor(
    @InjectRepository(Labor)
    private readonly laborRepository: Repository<Labor>,
  ) {}

  findAllByVivero(viveroId: string): Promise<Labor[]> {
    return this.laborRepository.find({
      where: { vivero_id: viveroId },
      relations: LABOR_RELATIONS,
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Labor> {
    const labor = await this.laborRepository.findOne({
      where: { id },
      relations: LABOR_RELATIONS,
    });
    if (!labor) {
      throw new NotFoundException(`Labor con id ${id} no encontrada`);
    }
    return labor;
  }

  create(viveroId: string, data: Partial<Labor>): Promise<Labor> {
    const labor = this.laborRepository.create({
      ...data,
      vivero_id: viveroId,
    });
    return this.laborRepository.save(labor);
  }

  async update(id: number, data: Partial<Labor>): Promise<Labor> {
    await this.findOne(id);
    await this.laborRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.laborRepository.delete(id);
  }
}
