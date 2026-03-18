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
exports.ViveroController = void 0;
const common_1 = require("@nestjs/common");
const vivero_service_1 = require("./vivero.service");
let ViveroController = class ViveroController {
    viveroService;
    constructor(viveroService) {
        this.viveroService = viveroService;
    }
    findAll(numeroCatastro) {
        return this.viveroService.findAllByFinca(numeroCatastro);
    }
    findOne(codigo) {
        return this.viveroService.findOne(codigo);
    }
    create(numeroCatastro, data) {
        return this.viveroService.create(numeroCatastro, data);
    }
    update(codigo, data) {
        return this.viveroService.update(codigo, data);
    }
    remove(codigo) {
        return this.viveroService.remove(codigo);
    }
};
exports.ViveroController = ViveroController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('numeroCatastro')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ViveroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ViveroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('numeroCatastro')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ViveroController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ViveroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ViveroController.prototype, "remove", null);
exports.ViveroController = ViveroController = __decorate([
    (0, common_1.Controller)('fincas/:numeroCatastro/viveros'),
    __metadata("design:paramtypes", [vivero_service_1.ViveroService])
], ViveroController);
//# sourceMappingURL=vivero.controller.js.map