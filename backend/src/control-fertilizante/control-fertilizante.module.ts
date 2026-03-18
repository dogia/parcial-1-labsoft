import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlFertilizante])],
  exports: [TypeOrmModule],
})
export class ControlFertilizanteModule {}
