import { FincaService } from './finca.service';
import { Finca } from '../entity/finca.entity';
export declare class FincaController {
    private readonly fincaService;
    constructor(fincaService: FincaService);
    findAll(documento: string): Promise<Finca[]>;
    findOne(numeroCatastro: string): Promise<Finca>;
    create(documento: string, data: Partial<Finca>): Promise<Finca>;
    update(numeroCatastro: string, data: Partial<Finca>): Promise<Finca>;
    remove(numeroCatastro: string): Promise<void>;
}
