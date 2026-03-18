import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProductoControl } from './producto-control.entity';

@Entity()
export class ControlFertilizante {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  fecha_ultima_aplicacion: Date;

  @OneToOne(() => ProductoControl, { nullable: false })
  @JoinColumn({ name: 'id' })
  productoControl: ProductoControl;
}
