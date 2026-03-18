import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productor } from '../entity/productor.entity';

@Injectable()
export class ProductorService {
  constructor(
    @InjectRepository(Productor)
    private readonly productorRepository: Repository<Productor>,
  ) {}

  findAll(): Promise<Productor[]> {
    return this.productorRepository.find();
  }

  async findOne(documento: string): Promise<Productor> {
    const productor = await this.productorRepository.findOneBy({ documento });
    if (!productor) {
      throw new NotFoundException(`Productor con documento ${documento} no encontrado`);
    }
    return productor;
  }

  create(data: Partial<Productor>): Promise<Productor> {
    const productor = this.productorRepository.create(data);
    return this.productorRepository.save(productor);
  }

  async update(documento: string, data: Partial<Productor>): Promise<Productor> {
    await this.findOne(documento);
    await this.productorRepository.update(documento, data);
    return this.findOne(documento);
  }

  async remove(documento: string): Promise<void> {
    await this.findOne(documento);
    await this.productorRepository.delete(documento);
  }
}
