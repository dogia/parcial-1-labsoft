import { Finca } from './finca.entity';
import { Labor } from './labor.entity';
export declare class Vivero {
    codigo: string;
    tipo_cultivo: string;
    finca_id: string;
    finca: Finca;
    labores: Labor[];
}
