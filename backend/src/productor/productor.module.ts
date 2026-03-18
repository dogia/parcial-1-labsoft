import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productor } from '../entity/productor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productor])],
  exports: [TypeOrmModule],
})
export class ProductorModule {}
