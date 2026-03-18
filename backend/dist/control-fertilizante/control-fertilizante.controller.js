"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFertilizanteController = void 0;
const common_1 = require("@nestjs/common");
const control_fertilizante_service_1 = require("./control-fertilizante.service");
let ControlFertilizanteController = class ControlFertilizanteController {
    controlFertilizanteService;
    constructor(controlFertilizanteService) {
        this.controlFertilizanteService = controlFertilizanteService;
    }
    findOne(productoId) {
        return this.controlFertilizanteService.findOneByProducto(productoId);
    }
    create(productoId, data) {
        return this.controlFertilizanteService.create(productoId, data);
    }
    update(productoId, data) {
        return this.controlFertilizanteService.update(productoId, data);
    }
    remove(productoId) {
        return this.controlFertilizanteService.remove(productoId);
    }
};
exports.ControlFertilizanteController = ControlFertilizanteController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ControlFertilizanteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControlFertilizanteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControlFertilizanteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ControlFertilizanteController.prototype, "remove", null);
exports.ControlFertilizanteController = ControlFertilizanteController = __decorate([
    (0, common_1.Controller)('productos-control/:productoId/control-fertilizante'),
    __metadata("design:paramtypes", [control_fertilizante_service_1.ControlFertilizanteService])
], ControlFertilizanteController);
//# sourceMappingURL=control-fertilizante.controller.js.map