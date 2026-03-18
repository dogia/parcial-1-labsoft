"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const productor_module_1 = require("./productor/productor.module");
const finca_module_1 = require("./finca/finca.module");
const vivero_module_1 = require("./vivero/vivero.module");
const labor_module_1 = require("./labor/labor.module");
const producto_control_module_1 = require("./producto-control/producto-control.module");
const control_plaga_module_1 = require("./control-plaga/control-plaga.module");
const control_hongo_module_1 = require("./control-hongo/control-hongo.module");
const control_fertilizante_module_1 = require("./control-fertilizante/control-fertilizante.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'viveros_db',
                autoLoadEntities: true,
                synchronize: true,
            }),
            productor_module_1.ProductorModule,
            finca_module_1.FincaModule,
            vivero_module_1.ViveroModule,
            labor_module_1.LaborModule,
            producto_control_module_1.ProductoControlModule,
            control_plaga_module_1.ControlPlagaModule,
            control_hongo_module_1.ControlHongoModule,
            control_fertilizante_module_1.ControlFertilizanteModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map