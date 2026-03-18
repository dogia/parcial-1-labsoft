import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from '../entity/finca.entity';
import { FincaController } from './finca.controller';
import { FincaService } from './finca.service';

@Module({
  imports: [TypeOrmModule.forFeature([Finca])],
  controllers: [FincaController],
  providers: [FincaService],
  exports: [TypeOrmModule],
})
export class FincaModule {}
