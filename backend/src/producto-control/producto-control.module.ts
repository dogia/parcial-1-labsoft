import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoControl } from '../entity/producto-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoControl])],
  exports: [TypeOrmModule],
})
export class ProductoControlModule {}
