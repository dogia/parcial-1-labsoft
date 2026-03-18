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
exports.Vivero = void 0;
const typeorm_1 = require("typeorm");
const finca_entity_1 = require("./finca.entity");
const labor_entity_1 = require("./labor.entity");
let Vivero = class Vivero {
    codigo;
    tipo_cultivo;
    finca_id;
    finca;
    labores;
};
exports.Vivero = Vivero;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vivero.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Vivero.prototype, "tipo_cultivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Vivero.prototype, "finca_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finca_entity_1.Finca, (finca) => finca.viveros, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'finca_id' }),
    __metadata("design:type", finca_entity_1.Finca)
], Vivero.prototype, "finca", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => labor_entity_1.Labor, (labor) => labor.vivero),
    __metadata("design:type", Array)
], Vivero.prototype, "labores", void 0);
exports.Vivero = Vivero = __decorate([
    (0, typeorm_1.Entity)()
], Vivero);
//# sourceMappingURL=vivero.entity.js.map