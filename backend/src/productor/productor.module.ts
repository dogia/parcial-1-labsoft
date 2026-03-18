import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productor } from '../entity/productor.entity';
import { ProductorController } from './productor.controller';
import { ProductorService } from './productor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Productor])],
  controllers: [ProductorController],
  providers: [ProductorService],
  exports: [TypeOrmModule],
})
export class ProductorModule {}
