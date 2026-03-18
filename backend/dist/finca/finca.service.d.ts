import { Repository } from 'typeorm';
import { Finca } from '../entity/finca.entity';
export declare class FincaService {
    private readonly fincaRepository;
    constructor(fincaRepository: Repository<Finca>);
    findAllByProductor(productorDocumento: string): Promise<Finca[]>;
    findOne(numeroCatastro: string): Promise<Finca>;
    create(productorDocumento: string, data: Partial<Finca>): Promise<Finca>;
    update(numeroCatastro: string, data: Partial<Finca>): Promise<Finca>;
    remove(numeroCatastro: string): Promise<void>;
}
