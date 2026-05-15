import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RolUsuario {
  ADMIN = 'ADMIN',
  EMPLEADO = 'EMPLEADO',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  correo: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: RolUsuario, nullable: false })
  rol: RolUsuario;

  @Column({ default: true })
  activo: boolean;
}
