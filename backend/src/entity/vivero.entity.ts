import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Finca } from './finca.entity';
import { Labor } from './labor.entity';

@Entity()
export class Vivero {
  @PrimaryColumn()
  codigo: string;

  @Column({ nullable: false })
  tipo_cultivo: string;

  @Column({ nullable: false })
  finca_id: string;

  @ManyToOne(() => Finca, (finca) => finca.viveros, { nullable: false })
  @JoinColumn({ name: 'finca_id' })
  finca: Finca;

  @OneToMany(() => Labor, (labor) => labor.vivero)
  labores: Labor[];
}
