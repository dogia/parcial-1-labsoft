import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Labor } from '../entity/labor.entity';

@Injectable()
export class LaborService {
  constructor(
    @InjectRepository(Labor)
    private readonly laborRepository: Repository<Labor>,
  ) {}

  findAllByVivero(viveroId: string): Promise<Labor[]> {
    return this.laborRepository.findBy({ vivero_id: viveroId });
  }

  async findOne(id: number): Promise<Labor> {
    const labor = await this.laborRepository.findOneBy({ id });
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
