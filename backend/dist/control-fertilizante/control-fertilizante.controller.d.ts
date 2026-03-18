import { ControlFertilizanteService } from './control-fertilizante.service';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';
export declare class ControlFertilizanteController {
    private readonly controlFertilizanteService;
    constructor(controlFertilizanteService: ControlFertilizanteService);
    findOne(productoId: number): Promise<ControlFertilizante>;
    create(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante>;
    update(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante>;
    remove(productoId: number): Promise<void>;
}
