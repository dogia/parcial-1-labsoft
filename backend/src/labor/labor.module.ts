import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Labor } from '../entity/labor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Labor])],
  exports: [TypeOrmModule],
})
export class LaborModule {}
