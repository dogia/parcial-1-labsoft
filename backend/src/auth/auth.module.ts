import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'desarrollo-cambiar-en-produccion',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as `${number}${'s' | 'm' | 'h' | 'd'}`,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
