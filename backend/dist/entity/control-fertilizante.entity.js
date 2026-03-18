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
exports.ControlFertilizante = void 0;
const typeorm_1 = require("typeorm");
const producto_control_entity_1 = require("./producto-control.entity");
let ControlFertilizante = class ControlFertilizante {
    id;
    fecha_ultima_aplicacion;
    productoControl;
};
exports.ControlFertilizante = ControlFertilizante;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ControlFertilizante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], ControlFertilizante.prototype, "fecha_ultima_aplicacion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => producto_control_entity_1.ProductoControl, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", producto_control_entity_1.ProductoControl)
], ControlFertilizante.prototype, "productoControl", void 0);
exports.ControlFertilizante = ControlFertilizante = __decorate([
    (0, typeorm_1.Entity)()
], ControlFertilizante);
//# sourceMappingURL=control-fertilizante.entity.js.map