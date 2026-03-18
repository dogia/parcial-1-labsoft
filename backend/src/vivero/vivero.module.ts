import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from '../entity/vivero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero])],
  exports: [TypeOrmModule],
})
export class ViveroModule {}
