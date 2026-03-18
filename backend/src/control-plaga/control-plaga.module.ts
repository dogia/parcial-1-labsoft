import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlPlaga } from '../entity/control-plaga.entity';
import { ControlPlagaController } from './control-plaga.controller';
import { ControlPlagaService } from './control-plaga.service';

@Module({
  imports: [TypeOrmModule.forFeature([ControlPlaga])],
  controllers: [ControlPlagaController],
  providers: [ControlPlagaService],
  exports: [TypeOrmModule],
})
export class ControlPlagaModule {}
