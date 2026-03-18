import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vivero } from '../entity/vivero.entity';
import { ViveroController } from './vivero.controller';
import { ViveroService } from './vivero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vivero])],
  controllers: [ViveroController],
  providers: [ViveroService],
  exports: [TypeOrmModule],
})
export class ViveroModule {}
