import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TestAppModule } from './test-app.module';
import { UsuarioService } from '../src/usuario/usuario.service';
import { RolUsuario } from '../src/entity/usuario.entity';

describe('Sistema de Viveros (e2e)', () => {
  let app: INestApplication;
  let tokenAdmin: string;
  let tokenEmpleado: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'secreto-de-pruebas';

    const moduleRef = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    const usuarioService = app.get(UsuarioService);
    await usuarioService.create({
      correo: 'admin@viveros.test',
      nombre: 'Admin Test',
      password: 'Admin123!',
      rol: RolUsuario.ADMIN,
    });
    await usuarioService.create({
      correo: 'empleado@viveros.test',
      nombre: 'Empleado Test',
      password: 'Empleado123!',
      rol: RolUsuario.EMPLEADO,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Autenticacion', () => {
    it('POST /auth/login rechaza con 401 si las credenciales no coinciden', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ correo: 'admin@viveros.test', password: 'incorrecto' })
        .expect(401);
    });

    it('POST /auth/login con admin emite un JWT y devuelve el rol', async () => {
      const respuesta = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ correo: 'admin@viveros.test', password: 'Admin123!' })
        .expect(200);

      expect(respuesta.body.access_token).toEqual(expect.any(String));
      expect(respuesta.body.rol).toBe('ADMIN');
      tokenAdmin = respuesta.body.access_token;
    });

    it('POST /auth/login con empleado emite un JWT con rol EMPLEADO', async () => {
      const respuesta = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ correo: 'empleado@viveros.test', password: 'Empleado123!' })
        .expect(200);

      tokenEmpleado = respuesta.body.access_token;
      expect(respuesta.body.rol).toBe('EMPLEADO');
    });

    it('GET /productores sin token responde 401', async () => {
      await request(app.getHttpServer()).get('/productores').expect(401);
    });

    it('POST /auth/login con body invalido responde 400', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ correo: 'no-es-email', password: 'x' })
        .expect(400);
    });
  });

  describe('CRUD de productores autorizado', () => {
    it('GET /productores con token de empleado responde 200 con arreglo vacio', async () => {
      const respuesta = await request(app.getHttpServer())
        .get('/productores')
        .set('Authorization', `Bearer ${tokenEmpleado}`)
        .expect(200);
      expect(respuesta.body).toEqual([]);
    });

    it('POST /productores con empleado responde 403', async () => {
      await request(app.getHttpServer())
        .post('/productores')
        .set('Authorization', `Bearer ${tokenEmpleado}`)
        .send({
          documento: '1088000001',
          nombre: 'Carlos',
          apellido: 'Lopez',
          telefono: '3001234567',
          correo: 'carlos@viveros.co',
        })
        .expect(403);
    });

    it('POST /productores con admin crea el productor y lo devuelve', async () => {
      const respuesta = await request(app.getHttpServer())
        .post('/productores')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
          documento: '1088000001',
          nombre: 'Carlos',
          apellido: 'Lopez',
          telefono: '3001234567',
          correo: 'carlos@viveros.co',
        })
        .expect(201);

      expect(respuesta.body.documento).toBe('1088000001');
    });

    it('GET /productores/:documento devuelve el detalle creado', async () => {
      const respuesta = await request(app.getHttpServer())
        .get('/productores/1088000001')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200);

      expect(respuesta.body.nombre).toBe('Carlos');
    });

    it('GET /productores/:documento/viveros responde 200 con arreglo vacio cuando no hay viveros', async () => {
      const respuesta = await request(app.getHttpServer())
        .get('/productores/1088000001/viveros')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200);

      expect(respuesta.body).toEqual([]);
    });

    it('DELETE /productores/:documento con admin elimina el productor', async () => {
      await request(app.getHttpServer())
        .delete('/productores/1088000001')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(200);

      await request(app.getHttpServer())
        .get('/productores/1088000001')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .expect(404);
    });
  });
});
