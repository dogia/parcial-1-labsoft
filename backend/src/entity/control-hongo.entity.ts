import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ProductoControl } from './producto-control.entity';

@Entity()
export class ControlHongo {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  periodo_carencia: number;

  @Column({ nullable: false })
  nombre_hongo: string;

  @OneToOne(() => ProductoControl, { nullable: false })
  @JoinColumn({ name: 'id' })
  productoControl: ProductoControl;
}
