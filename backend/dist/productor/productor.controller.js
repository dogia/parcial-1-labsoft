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
exports.ProductorController = void 0;
const common_1 = require("@nestjs/common");
const productor_service_1 = require("./productor.service");
let ProductorController = class ProductorController {
    productorService;
    constructor(productorService) {
        this.productorService = productorService;
    }
    findAll() {
        return this.productorService.findAll();
    }
    findOne(documento) {
        return this.productorService.findOne(documento);
    }
    create(data) {
        return this.productorService.create(data);
    }
    update(documento, data) {
        return this.productorService.update(documento, data);
    }
    remove(documento) {
        return this.productorService.remove(documento);
    }
};
exports.ProductorController = ProductorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':documento'),
    __param(0, (0, common_1.Param)('documento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':documento'),
    __param(0, (0, common_1.Param)('documento')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':documento'),
    __param(0, (0, common_1.Param)('documento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductorController.prototype, "remove", null);
exports.ProductorController = ProductorController = __decorate([
    (0, common_1.Controller)('productores'),
    __metadata("design:paramtypes", [productor_service_1.ProductorService])
], ProductorController);
//# sourceMappingURL=productor.controller.js.map