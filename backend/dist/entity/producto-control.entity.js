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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoControl = void 0;
const typeorm_1 = require("typeorm");
const labor_entity_1 = require("./labor.entity");
const control_plaga_entity_1 = require("./control-plaga.entity");
const control_hongo_entity_1 = require("./control-hongo.entity");
const control_fertilizante_entity_1 = require("./control-fertilizante.entity");
let ProductoControl = class ProductoControl {
    id;
    registro_ica;
    nombre;
    frecuencia_aplicacion;
    valor;
    tipo;
    labores;
    controlPlaga;
    controlHongo;
    controlFertilizante;
};
exports.ProductoControl = ProductoControl;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductoControl.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ProductoControl.prototype, "registro_ica", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ProductoControl.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ProductoControl.prototype, "frecuencia_aplicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ProductoControl.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ProductoControl.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => labor_entity_1.Labor, (labor) => labor.producto),
    __metadata("design:type", Array)
], ProductoControl.prototype, "labores", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => control_plaga_entity_1.ControlPlaga, (controlPlaga) => controlPlaga.productoControl),
    __metadata("design:type", control_plaga_entity_1.ControlPlaga)
], ProductoControl.prototype, "controlPlaga", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => control_hongo_entity_1.ControlHongo, (controlHongo) => controlHongo.productoControl),
    __metadata("design:type", control_hongo_entity_1.ControlHongo)
], ProductoControl.prototype, "controlHongo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => control_fertilizante_entity_1.ControlFertilizante, (controlFertilizante) => controlFertilizante.productoControl),
    __metadata("design:type", control_fertilizante_entity_1.ControlFertilizante)
], ProductoControl.prototype, "controlFertilizante", void 0);
exports.ProductoControl = ProductoControl = __decorate([
    (0, typeorm_1.Entity)()
], ProductoControl);
//# sourceMappingURL=producto-control.entity.js.map