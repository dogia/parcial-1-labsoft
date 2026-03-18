import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Labor } from './labor.entity';
import { ControlPlaga } from './control-plaga.entity';
import { ControlHongo } from './control-hongo.entity';
import { ControlFertilizante } from './control-fertilizante.entity';

@Entity()
export class ProductoControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  registro_ica: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  frecuencia_aplicacion: number;

  @Column({ nullable: false })
  valor: number;

  @Column({ nullable: false })
  tipo: string;

  @OneToMany(() => Labor, (labor) => labor.producto)
  labores: Labor[];

  @OneToOne(() => ControlPlaga, (controlPlaga) => controlPlaga.productoControl)
  controlPlaga: ControlPlaga;

  @OneToOne(() => ControlHongo, (controlHongo) => controlHongo.productoControl)
  controlHongo: ControlHongo;

  @OneToOne(() => ControlFertilizante, (controlFertilizante) => controlFertilizante.productoControl)
  controlFertilizante: ControlFertilizante;
}
