import { Repository } from 'typeorm';
import { ControlPlaga } from '../entity/control-plaga.entity';
export declare class ControlPlagaService {
    private readonly controlPlagaRepository;
    constructor(controlPlagaRepository: Repository<ControlPlaga>);
    findAll(): Promise<ControlPlaga[]>;
    findOneByProducto(productoId: number): Promise<ControlPlaga>;
    create(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga>;
    update(productoId: number, data: Partial<ControlPlaga>): Promise<ControlPlaga>;
    remove(productoId: number): Promise<void>;
}
