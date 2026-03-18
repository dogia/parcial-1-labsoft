import { ControlHongoService } from './control-hongo.service';
import { ControlHongo } from '../entity/control-hongo.entity';
export declare class ControlHongoController {
    private readonly controlHongoService;
    constructor(controlHongoService: ControlHongoService);
    findOne(productoId: number): Promise<ControlHongo>;
    create(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo>;
    update(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo>;
    remove(productoId: number): Promise<void>;
}
