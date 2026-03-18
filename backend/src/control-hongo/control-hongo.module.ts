import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlHongo } from '../entity/control-hongo.entity';
import { ControlHongoController } from './control-hongo.controller';
import { ControlHongoService } from './control-hongo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ControlHongo])],
  controllers: [ControlHongoController],
  providers: [ControlHongoService],
  exports: [TypeOrmModule],
})
export class ControlHongoModule {}
