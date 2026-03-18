import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Labor } from '../entity/labor.entity';
import { LaborController } from './labor.controller';
import { LaborService } from './labor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Labor])],
  controllers: [LaborController],
  providers: [LaborService],
  exports: [TypeOrmModule],
})
export class LaborModule {}
