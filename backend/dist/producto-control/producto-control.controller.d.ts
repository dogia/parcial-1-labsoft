import { ProductoControlService } from './producto-control.service';
import { ProductoControl } from '../entity/producto-control.entity';
export declare class ProductoControlController {
    private readonly productoControlService;
    constructor(productoControlService: ProductoControlService);
    findAll(): Promise<ProductoControl[]>;
    findOne(id: number): Promise<ProductoControl>;
    create(data: Partial<ProductoControl>): Promise<ProductoControl>;
    update(id: number, data: Partial<ProductoControl>): Promise<ProductoControl>;
    remove(id: number): Promise<void>;
}
