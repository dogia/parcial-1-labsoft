import { Repository } from 'typeorm';
import { Labor } from '../entity/labor.entity';
export declare class LaborService {
    private readonly laborRepository;
    constructor(laborRepository: Repository<Labor>);
    findAllByVivero(viveroId: string): Promise<Labor[]>;
    findOne(id: number): Promise<Labor>;
    create(viveroId: string, data: Partial<Labor>): Promise<Labor>;
    update(id: number, data: Partial<Labor>): Promise<Labor>;
    remove(id: number): Promise<void>;
}
