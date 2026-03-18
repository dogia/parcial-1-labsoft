import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from '../entity/finca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finca])],
  exports: [TypeOrmModule],
})
export class FincaModule {}
