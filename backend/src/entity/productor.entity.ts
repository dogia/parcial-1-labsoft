import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Finca } from './finca.entity';

@Entity()
export class Productor {
  @PrimaryColumn()
  documento: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  apellido: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  correo: string;

  @OneToMany(() => Finca, (finca) => finca.productor)
  fincas: Finca[];
}
