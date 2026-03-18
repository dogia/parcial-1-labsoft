import { LaborService } from './labor.service';
import { Labor } from '../entity/labor.entity';
export declare class LaborController {
    private readonly laborService;
    constructor(laborService: LaborService);
    findAll(codigo: string): Promise<Labor[]>;
    findOne(id: number): Promise<Labor>;
    create(codigo: string, data: Partial<Labor>): Promise<Labor>;
    update(id: number, data: Partial<Labor>): Promise<Labor>;
    remove(id: number): Promise<void>;
}
