import { Repository } from 'typeorm';
import { Vivero } from '../entity/vivero.entity';
export declare class ViveroService {
    private readonly viveroRepository;
    constructor(viveroRepository: Repository<Vivero>);
    findAllByFinca(fincaId: string): Promise<Vivero[]>;
    findOne(codigo: string): Promise<Vivero>;
    create(fincaId: string, data: Partial<Vivero>): Promise<Vivero>;
    update(codigo: string, data: Partial<Vivero>): Promise<Vivero>;
    remove(codigo: string): Promise<void>;
}
