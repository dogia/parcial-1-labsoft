import { ViveroService } from './vivero.service';
import { Vivero } from '../entity/vivero.entity';
export declare class ViveroController {
    private readonly viveroService;
    constructor(viveroService: ViveroService);
    findAll(numeroCatastro: string): Promise<Vivero[]>;
    findOne(codigo: string): Promise<Vivero>;
    create(numeroCatastro: string, data: Partial<Vivero>): Promise<Vivero>;
    update(codigo: string, data: Partial<Vivero>): Promise<Vivero>;
    remove(codigo: string): Promise<void>;
}
