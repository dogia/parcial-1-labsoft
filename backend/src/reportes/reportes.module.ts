import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from '../entity/vivero.entity';
import { LaborModule } from '../labor/labor.module';
import { ViveroModule } from '../vivero/vivero.module';
import { ProductorModule } from '../productor/productor.module';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vivero]),
    LaborModule,
    ViveroModule,
    ProductorModule,
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
