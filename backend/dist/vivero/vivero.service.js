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
exports.ViveroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vivero_entity_1 = require("../entity/vivero.entity");
let ViveroService = class ViveroService {
    viveroRepository;
    constructor(viveroRepository) {
        this.viveroRepository = viveroRepository;
    }
    findAllByFinca(fincaId) {
        return this.viveroRepository.findBy({ finca_id: fincaId });
    }
    async findOne(codigo) {
        const vivero = await this.viveroRepository.findOneBy({ codigo });
        if (!vivero) {
            throw new common_1.NotFoundException(`Vivero con código ${codigo} no encontrado`);
        }
        return vivero;
    }
    create(fincaId, data) {
        const vivero = this.viveroRepository.create({
            ...data,
            finca_id: fincaId,
        });
        return this.viveroRepository.save(vivero);
    }
    async update(codigo, data) {
        await this.findOne(codigo);
        await this.viveroRepository.update(codigo, data);
        return this.findOne(codigo);
    }
    async remove(codigo) {
        await this.findOne(codigo);
        await this.viveroRepository.delete(codigo);
    }
};
exports.ViveroService = ViveroService;
exports.ViveroService = ViveroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vivero_entity_1.Vivero)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ViveroService);
//# sourceMappingURL=vivero.service.js.map