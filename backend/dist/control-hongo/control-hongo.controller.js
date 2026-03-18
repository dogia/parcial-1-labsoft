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
exports.ControlHongoController = void 0;
const common_1 = require("@nestjs/common");
const control_hongo_service_1 = require("./control-hongo.service");
let ControlHongoController = class ControlHongoController {
    controlHongoService;
    constructor(controlHongoService) {
        this.controlHongoService = controlHongoService;
    }
    findOne(productoId) {
        return this.controlHongoService.findOneByProducto(productoId);
    }
    create(productoId, data) {
        return this.controlHongoService.create(productoId, data);
    }
    update(productoId, data) {
        return this.controlHongoService.update(productoId, data);
    }
    remove(productoId) {
        return this.controlHongoService.remove(productoId);
    }
};
exports.ControlHongoController = ControlHongoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ControlHongoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControlHongoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ControlHongoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ControlHongoController.prototype, "remove", null);
exports.ControlHongoController = ControlHongoController = __decorate([
    (0, common_1.Controller)('productos-control/:productoId/control-hongo'),
    __metadata("design:paramtypes", [control_hongo_service_1.ControlHongoService])
], ControlHongoController);
//# sourceMappingURL=control-hongo.controller.js.map