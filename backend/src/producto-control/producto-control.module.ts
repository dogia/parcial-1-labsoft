import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoControl } from '../entity/producto-control.entity';
import { ProductoControlController } from './producto-control.controller';
import { ProductoControlService } from './producto-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoControl])],
  controllers: [ProductoControlController],
  providers: [ProductoControlService],
  exports: [TypeOrmModule],
})
export class ProductoControlModule {}
