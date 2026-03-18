import { Productor } from './productor.entity';
import { Vivero } from './vivero.entity';
export declare class Finca {
    numero_catastro: string;
    municipio: string;
    productor_id: string;
    productor: Productor;
    viveros: Vivero[];
}
