import { Repository } from 'typeorm';
import { Productor } from '../entity/productor.entity';
export declare class ProductorService {
    private readonly productorRepository;
    constructor(productorRepository: Repository<Productor>);
    findAll(): Promise<Productor[]>;
    findOne(documento: string): Promise<Productor>;
    create(data: Partial<Productor>): Promise<Productor>;
    update(documento: string, data: Partial<Productor>): Promise<Productor>;
    remove(documento: string): Promise<void>;
}
