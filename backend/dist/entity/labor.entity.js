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
exports.Labor = void 0;
const typeorm_1 = require("typeorm");
const vivero_entity_1 = require("./vivero.entity");
const producto_control_entity_1 = require("./producto-control.entity");
let Labor = class Labor {
    id;
    fecha;
    descripcion;
    vivero_id;
    producto_id;
    vivero;
    producto;
};
exports.Labor = Labor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Labor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Labor.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Labor.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Labor.prototype, "vivero_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Labor.prototype, "producto_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vivero_entity_1.Vivero, (vivero) => vivero.labores, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'vivero_id' }),
    __metadata("design:type", vivero_entity_1.Vivero)
], Labor.prototype, "vivero", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_control_entity_1.ProductoControl, (producto) => producto.labores, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_control_entity_1.ProductoControl)
], Labor.prototype, "producto", void 0);
exports.Labor = Labor = __decorate([
    (0, typeorm_1.Entity)()
], Labor);
//# sourceMappingURL=labor.entity.js.map