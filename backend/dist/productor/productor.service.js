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
exports.ProductorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productor_entity_1 = require("../entity/productor.entity");
let ProductorService = class ProductorService {
    productorRepository;
    constructor(productorRepository) {
        this.productorRepository = productorRepository;
    }
    findAll() {
        return this.productorRepository.find();
    }
    async findOne(documento) {
        const productor = await this.productorRepository.findOneBy({ documento });
        if (!productor) {
            throw new common_1.NotFoundException(`Productor con documento ${documento} no encontrado`);
        }
        return productor;
    }
    create(data) {
        const productor = this.productorRepository.create(data);
        return this.productorRepository.save(productor);
    }
    async update(documento, data) {
        await this.findOne(documento);
        await this.productorRepository.update(documento, data);
        return this.findOne(documento);
    }
    async remove(documento) {
        await this.findOne(documento);
        await this.productorRepository.delete(documento);
    }
};
exports.ProductorService = ProductorService;
exports.ProductorService = ProductorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(productor_entity_1.Productor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductorService);
//# sourceMappingURL=productor.service.js.map