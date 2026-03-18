import { ProductorService } from './productor.service';
import { Productor } from '../entity/productor.entity';
export declare class ProductorController {
    private readonly productorService;
    constructor(productorService: ProductorService);
    findAll(): Promise<Productor[]>;
    findOne(documento: string): Promise<Productor>;
    create(data: Partial<Productor>): Promise<Productor>;
    update(documento: string, data: Partial<Productor>): Promise<Productor>;
    remove(documento: string): Promise<void>;
}
