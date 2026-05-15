import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productor } from '../src/entity/productor.entity';
import { Finca } from '../src/entity/finca.entity';
import { Vivero } from '../src/entity/vivero.entity';
import { Labor } from '../src/entity/labor.entity';
import { ProductoControl } from '../src/entity/producto-control.entity';
import { ControlPlaga } from '../src/entity/control-plaga.entity';
import { ControlHongo } from '../src/entity/control-hongo.entity';
import { ControlFertilizante } from '../src/entity/control-fertilizante.entity';
import { Usuario } from '../src/entity/usuario.entity';
import { ProductorModule } from '../src/productor/productor.module';
import { FincaModule } from '../src/finca/finca.module';
import { ViveroModule } from '../src/vivero/vivero.module';
import { LaborModule } from '../src/labor/labor.module';
import { ProductoControlModule } from '../src/producto-control/producto-control.module';
import { ControlPlagaModule } from '../src/control-plaga/control-plaga.module';
import { ControlHongoModule } from '../src/control-hongo/control-hongo.module';
import { ControlFertilizanteModule } from '../src/control-fertilizante/control-fertilizante.module';
import { UsuarioModule } from '../src/usuario/usuario.module';
import { AuthModule } from '../src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [
        Productor,
        Finca,
        Vivero,
        Labor,
        ProductoControl,
        ControlPlaga,
        ControlHongo,
        ControlFertilizante,
        Usuario,
      ],
      synchronize: true,
      retryAttempts: 1,
      // Postgres usa "enum"; SQLite no, asi que typeorm los emite como
      // CHECK constraints sobre TEXT. Funciona sin configuracion extra.
    }),
    ProductorModule,
    FincaModule,
    ViveroModule,
    LaborModule,
    ProductoControlModule,
    ControlPlagaModule,
    ControlHongoModule,
    ControlFertilizanteModule,
    UsuarioModule,
    AuthModule,
  ],
})
export class TestAppModule {}
