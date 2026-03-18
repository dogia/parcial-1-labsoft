import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vivero } from '../entity/vivero.entity';

@Injectable()
export class ViveroService {
  constructor(
    @InjectRepository(Vivero)
    private readonly viveroRepository: Repository<Vivero>,
  ) {}

  findAllByFinca(fincaId: string): Promise<Vivero[]> {
    return this.viveroRepository.findBy({ finca_id: fincaId });
  }

  async findOne(codigo: string): Promise<Vivero> {
    const vivero = await this.viveroRepository.findOneBy({ codigo });
    if (!vivero) {
      throw new NotFoundException(`Vivero con código ${codigo} no encontrado`);
    }
    return vivero;
  }

  create(fincaId: string, data: Partial<Vivero>): Promise<Vivero> {
    const vivero = this.viveroRepository.create({
      ...data,
      finca_id: fincaId,
    });
    return this.viveroRepository.save(vivero);
  }

  async update(codigo: string, data: Partial<Vivero>): Promise<Vivero> {
    await this.findOne(codigo);
    await this.viveroRepository.update(codigo, data);
    return this.findOne(codigo);
  }

  async remove(codigo: string): Promise<void> {
    await this.findOne(codigo);
    await this.viveroRepository.delete(codigo);
  }
}
