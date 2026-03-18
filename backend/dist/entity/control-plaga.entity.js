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
exports.ControlPlaga = void 0;
const typeorm_1 = require("typeorm");
const producto_control_entity_1 = require("./producto-control.entity");
let ControlPlaga = class ControlPlaga {
    id;
    periodo_carencia;
    productoControl;
};
exports.ControlPlaga = ControlPlaga;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ControlPlaga.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ControlPlaga.prototype, "periodo_carencia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => producto_control_entity_1.ProductoControl, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", producto_control_entity_1.ProductoControl)
], ControlPlaga.prototype, "productoControl", void 0);
exports.ControlPlaga = ControlPlaga = __decorate([
    (0, typeorm_1.Entity)()
], ControlPlaga);
//# sourceMappingURL=control-plaga.entity.js.map