import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vivero } from './vivero.entity';
import { ProductoControl } from './producto-control.entity';

@Entity()
export class Labor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ nullable: false })
  vivero_id: string;

  @Column({ nullable: false })
  producto_id: number;

  @ManyToOne(() => Vivero, (vivero) => vivero.labores, { nullable: false })
  @JoinColumn({ name: 'vivero_id' })
  vivero: Vivero;

  @ManyToOne(() => ProductoControl, (producto) => producto.labores, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  producto: ProductoControl;
}
