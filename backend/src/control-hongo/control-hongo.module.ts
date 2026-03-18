import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlHongo } from '../entity/control-hongo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlHongo])],
  exports: [TypeOrmModule],
})
export class ControlHongoModule {}
