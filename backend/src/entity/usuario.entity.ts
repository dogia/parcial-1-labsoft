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

  // simple-enum se mapea a enum nativo en Postgres y a TEXT con check
  // constraint en SQLite, permitiendo ejecutar las pruebas E2E sin Postgres.
  @Column({ type: 'simple-enum', enum: RolUsuario, nullable: false })
  rol: RolUsuario;

  @Column({ default: true })
  activo: boolean;
}
