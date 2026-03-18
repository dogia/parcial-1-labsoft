"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaborModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const labor_entity_1 = require("../entity/labor.entity");
const labor_controller_1 = require("./labor.controller");
const labor_service_1 = require("./labor.service");
let LaborModule = class LaborModule {
};
exports.LaborModule = LaborModule;
exports.LaborModule = LaborModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([labor_entity_1.Labor])],
        controllers: [labor_controller_1.LaborController],
        providers: [labor_service_1.LaborService],
        exports: [typeorm_1.TypeOrmModule],
    })
], LaborModule);
//# sourceMappingURL=labor.module.js.map