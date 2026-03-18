import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finca } from '../entity/finca.entity';

@Injectable()
export class FincaService {
  constructor(
    @InjectRepository(Finca)
    private readonly fincaRepository: Repository<Finca>,
  ) {}

  findAllByProductor(productorDocumento: string): Promise<Finca[]> {
    return this.fincaRepository.findBy({ productor_id: productorDocumento });
  }

  async findOne(numeroCatastro: string): Promise<Finca> {
    const finca = await this.fincaRepository.findOneBy({ numero_catastro: numeroCatastro });
    if (!finca) {
      throw new NotFoundException(`Finca con número catastro ${numeroCatastro} no encontrada`);
    }
    return finca;
  }

  create(productorDocumento: string, data: Partial<Finca>): Promise<Finca> {
    const finca = this.fincaRepository.create({
      ...data,
      productor_id: productorDocumento,
    });
    return this.fincaRepository.save(finca);
  }

  async update(numeroCatastro: string, data: Partial<Finca>): Promise<Finca> {
    await this.findOne(numeroCatastro);
    await this.fincaRepository.update(numeroCatastro, data);
    return this.findOne(numeroCatastro);
  }

  async remove(numeroCatastro: string): Promise<void> {
    await this.findOne(numeroCatastro);
    await this.fincaRepository.delete(numeroCatastro);
  }
}
