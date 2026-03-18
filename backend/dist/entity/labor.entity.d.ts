import { Vivero } from './vivero.entity';
import { ProductoControl } from './producto-control.entity';
export declare class Labor {
    id: number;
    fecha: Date;
    descripcion: string;
    vivero_id: string;
    producto_id: number;
    vivero: Vivero;
    producto: ProductoControl;
}
