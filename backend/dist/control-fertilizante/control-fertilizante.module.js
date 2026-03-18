"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFertilizanteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const control_fertilizante_entity_1 = require("../entity/control-fertilizante.entity");
const control_fertilizante_controller_1 = require("./control-fertilizante.controller");
const control_fertilizante_service_1 = require("./control-fertilizante.service");
let ControlFertilizanteModule = class ControlFertilizanteModule {
};
exports.ControlFertilizanteModule = ControlFertilizanteModule;
exports.ControlFertilizanteModule = ControlFertilizanteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([control_fertilizante_entity_1.ControlFertilizante])],
        controllers: [control_fertilizante_controller_1.ControlFertilizanteController],
        providers: [control_fertilizante_service_1.ControlFertilizanteService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ControlFertilizanteModule);
//# sourceMappingURL=control-fertilizante.module.js.map