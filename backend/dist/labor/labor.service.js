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
exports.LaborService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const labor_entity_1 = require("../entity/labor.entity");
let LaborService = class LaborService {
    laborRepository;
    constructor(laborRepository) {
        this.laborRepository = laborRepository;
    }
    findAllByVivero(viveroId) {
        return this.laborRepository.findBy({ vivero_id: viveroId });
    }
    async findOne(id) {
        const labor = await this.laborRepository.findOneBy({ id });
        if (!labor) {
            throw new common_1.NotFoundException(`Labor con id ${id} no encontrada`);
        }
        return labor;
    }
    create(viveroId, data) {
        const labor = this.laborRepository.create({
            ...data,
            vivero_id: viveroId,
        });
        return this.laborRepository.save(labor);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.laborRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.laborRepository.delete(id);
    }
};
exports.LaborService = LaborService;
exports.LaborService = LaborService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(labor_entity_1.Labor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LaborService);
//# sourceMappingURL=labor.service.js.map