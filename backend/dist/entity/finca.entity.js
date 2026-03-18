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
exports.Finca = void 0;
const typeorm_1 = require("typeorm");
const productor_entity_1 = require("./productor.entity");
const vivero_entity_1 = require("./vivero.entity");
let Finca = class Finca {
    numero_catastro;
    municipio;
    productor_id;
    productor;
    viveros;
};
exports.Finca = Finca;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Finca.prototype, "numero_catastro", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Finca.prototype, "municipio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Finca.prototype, "productor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productor_entity_1.Productor, (productor) => productor.fincas, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'productor_id' }),
    __metadata("design:type", productor_entity_1.Productor)
], Finca.prototype, "productor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vivero_entity_1.Vivero, (vivero) => vivero.finca),
    __metadata("design:type", Array)
], Finca.prototype, "viveros", void 0);
exports.Finca = Finca = __decorate([
    (0, typeorm_1.Entity)()
], Finca);
//# sourceMappingURL=finca.entity.js.map