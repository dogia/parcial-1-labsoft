import { Repository } from 'typeorm';
import { ControlHongo } from '../entity/control-hongo.entity';
export declare class ControlHongoService {
    private readonly controlHongoRepository;
    constructor(controlHongoRepository: Repository<ControlHongo>);
    findAll(): Promise<ControlHongo[]>;
    findOneByProducto(productoId: number): Promise<ControlHongo>;
    create(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo>;
    update(productoId: number, data: Partial<ControlHongo>): Promise<ControlHongo>;
    remove(productoId: number): Promise<void>;
}
