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
exports.ControlHongoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const control_hongo_entity_1 = require("../entity/control-hongo.entity");
let ControlHongoService = class ControlHongoService {
    controlHongoRepository;
    constructor(controlHongoRepository) {
        this.controlHongoRepository = controlHongoRepository;
    }
    findAll() {
        return this.controlHongoRepository.find();
    }
    async findOneByProducto(productoId) {
        const control = await this.controlHongoRepository.findOneBy({ id: productoId });
        if (!control) {
            throw new common_1.NotFoundException(`Control hongo para producto ${productoId} no encontrado`);
        }
        return control;
    }
    create(productoId, data) {
        const control = this.controlHongoRepository.create({
            ...data,
            id: productoId,
        });
        return this.controlHongoRepository.save(control);
    }
    async update(productoId, data) {
        await this.findOneByProducto(productoId);
        await this.controlHongoRepository.update(productoId, data);
        return this.findOneByProducto(productoId);
    }
    async remove(productoId) {
        await this.findOneByProducto(productoId);
        await this.controlHongoRepository.delete(productoId);
    }
};
exports.ControlHongoService = ControlHongoService;
exports.ControlHongoService = ControlHongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(control_hongo_entity_1.ControlHongo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ControlHongoService);
//# sourceMappingURL=control-hongo.service.js.map