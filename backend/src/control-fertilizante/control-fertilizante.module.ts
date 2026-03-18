import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';
import { ControlFertilizanteController } from './control-fertilizante.controller';
import { ControlFertilizanteService } from './control-fertilizante.service';

@Module({
  imports: [TypeOrmModule.forFeature([ControlFertilizante])],
  controllers: [ControlFertilizanteController],
  providers: [ControlFertilizanteService],
  exports: [TypeOrmModule],
})
export class ControlFertilizanteModule {}
