import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productor } from '../entity/productor.entity';
import { ProductorController } from './productor.controller';
import { ProductorService } from './productor.service';
import { ViveroModule } from '../vivero/vivero.module';

@Module({
  imports: [TypeOrmModule.forFeature([Productor]), ViveroModule],
  controllers: [ProductorController],
  providers: [ProductorService],
  exports: [TypeOrmModule, ProductorService],
})
export class ProductorModule {}
