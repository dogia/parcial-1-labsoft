import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlPlaga } from '../entity/control-plaga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlPlaga])],
  exports: [TypeOrmModule],
})
export class ControlPlagaModule {}
