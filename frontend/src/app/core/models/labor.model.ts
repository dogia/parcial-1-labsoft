import { ProductoControl } from './producto-control.model';

export interface Labor {
  id: number;
  fecha: string;
  descripcion: string;
  vivero_id: string;
  producto_id: number;
  producto?: ProductoControl;
}
