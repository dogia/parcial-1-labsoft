import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductorModule } from './productor/productor.module';
import { FincaModule } from './finca/finca.module';
import { ViveroModule } from './vivero/vivero.module';
import { LaborModule } from './labor/labor.module';
import { ProductoControlModule } from './producto-control/producto-control.module';
import { ControlPlagaModule } from './control-plaga/control-plaga.module';
import { ControlHongoModule } from './control-hongo/control-hongo.module';
import { ControlFertilizanteModule } from './control-fertilizante/control-fertilizante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'viveros_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductorModule,
    FincaModule,
    ViveroModule,
    LaborModule,
    ProductoControlModule,
    ControlPlagaModule,
    ControlHongoModule,
    ControlFertilizanteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
