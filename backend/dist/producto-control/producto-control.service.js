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
exports.ProductoControlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_control_entity_1 = require("../entity/producto-control.entity");
let ProductoControlService = class ProductoControlService {
    productoControlRepository;
    constructor(productoControlRepository) {
        this.productoControlRepository = productoControlRepository;
    }
    findAll() {
        return this.productoControlRepository.find();
    }
    async findOne(id) {
        const producto = await this.productoControlRepository.findOneBy({ id });
        if (!producto) {
            throw new common_1.NotFoundException(`Producto de control con id ${id} no encontrado`);
        }
        return producto;
    }
    create(data) {
        const producto = this.productoControlRepository.create(data);
        return this.productoControlRepository.save(producto);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.productoControlRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.productoControlRepository.delete(id);
    }
};
exports.ProductoControlService = ProductoControlService;
exports.ProductoControlService = ProductoControlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_control_entity_1.ProductoControl)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductoControlService);
//# sourceMappingURL=producto-control.service.js.map