import { ControlPlagaService } from './control-plaga.service';
import { ControlPlaga } from '../entity/control-plaga.entity';
export declare class ControlPlagaController {
    private readonly controlPlagaService;
    constructor(controlPlagaService: ControlPlagaService);
    findOne(productoId: number): Promise<ControlPlaga>;
    create(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga>;
    update(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga>;
    remove(productoId: number): Promise<void>;
}
