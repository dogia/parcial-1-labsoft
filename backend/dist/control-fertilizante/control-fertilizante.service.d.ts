import { Repository } from 'typeorm';
import { ControlFertilizante } from '../entity/control-fertilizante.entity';
export declare class ControlFertilizanteService {
    private readonly controlFertilizanteRepository;
    constructor(controlFertilizanteRepository: Repository<ControlFertilizante>);
    findAll(): Promise<ControlFertilizante[]>;
    findOneByProducto(productoId: number): Promise<ControlFertilizante>;
    create(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante>;
    update(productoId: number, data: Partial<ControlFertilizante>): Promise<ControlFertilizante>;
    remove(productoId: number): Promise<void>;
}
