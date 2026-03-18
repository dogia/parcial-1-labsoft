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
exports.FincaController = void 0;
const common_1 = require("@nestjs/common");
const finca_service_1 = require("./finca.service");
let FincaController = class FincaController {
    fincaService;
    constructor(fincaService) {
        this.fincaService = fincaService;
    }
    findAll(documento) {
        return this.fincaService.findAllByProductor(documento);
    }
    findOne(numeroCatastro) {
        return this.fincaService.findOne(numeroCatastro);
    }
    create(documento, data) {
        return this.fincaService.create(documento, data);
    }
    update(numeroCatastro, data) {
        return this.fincaService.update(numeroCatastro, data);
    }
    remove(numeroCatastro) {
        return this.fincaService.remove(numeroCatastro);
    }
};
exports.FincaController = FincaController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('documento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FincaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':numeroCatastro'),
    __param(0, (0, common_1.Param)('numeroCatastro')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FincaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('documento')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FincaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':numeroCatastro'),
    __param(0, (0, common_1.Param)('numeroCatastro')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FincaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':numeroCatastro'),
    __param(0, (0, common_1.Param)('numeroCatastro')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FincaController.prototype, "remove", null);
exports.FincaController = FincaController = __decorate([
    (0, common_1.Controller)('productores/:documento/fincas'),
    __metadata("design:paramtypes", [finca_service_1.FincaService])
], FincaController);
//# sourceMappingURL=finca.controller.js.map