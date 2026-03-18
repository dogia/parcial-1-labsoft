import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProductoControl } from './producto-control.entity';

@Entity()
export class ControlPlaga {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  periodo_carencia: number;

  @OneToOne(() => ProductoControl, { nullable: false })
  @JoinColumn({ name: 'id' })
  productoControl: ProductoControl;
}
