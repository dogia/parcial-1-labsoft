import { Repository } from 'typeorm';
import { ProductoControl } from '../entity/producto-control.entity';
export declare class ProductoControlService {
    private readonly productoControlRepository;
    constructor(productoControlRepository: Repository<ProductoControl>);
    findAll(): Promise<ProductoControl[]>;
    findOne(id: number): Promise<ProductoControl>;
    create(data: Partial<ProductoControl>): Promise<ProductoControl>;
    update(id: number, data: Partial<ProductoControl>): Promise<ProductoControl>;
    remove(id: number): Promise<void>;
}
