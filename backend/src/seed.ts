import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { UsuarioService } from './usuario/usuario.service';
import { RolUsuario } from './entity/usuario.entity';

async function bootstrap() {
  const logger = new Logger('Seed');
  const app = await NestFactory.createApplicationContext(AppModule, { logger });

  const correo = process.env.SEED_ADMIN_CORREO || 'admin@viveros.local';
  const nombre = process.env.SEED_ADMIN_NOMBRE || 'Administrador';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

  const usuarioService = app.get(UsuarioService);
  const existente = await usuarioService.findByCorreo(correo);

  if (existente) {
    logger.log(`El usuario administrador con correo "${correo}" ya existe; no se hace nada.`);
  } else {
    await usuarioService.create({
      correo,
      nombre,
      password,
      rol: RolUsuario.ADMIN,
    });
    logger.log(`Usuario administrador creado: ${correo}`);
    logger.log('Por seguridad, cambie la contrasena tras el primer ingreso.');
  }

  await app.close();
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Error ejecutando el seed:', error);
  process.exit(1);
});
