import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Productor } from './productor.entity';
import { Vivero } from './vivero.entity';

@Entity()
export class Finca {
  @PrimaryColumn()
  numero_catastro: string;

  @Column({ nullable: false })
  municipio: string;

  @Column({ nullable: false })
  productor_id: string;

  @ManyToOne(() => Productor, (productor) => productor.fincas, { nullable: false })
  @JoinColumn({ name: 'productor_id' })
  productor: Productor;

  @OneToMany(() => Vivero, (vivero) => vivero.finca)
  viveros: Vivero[];
}
