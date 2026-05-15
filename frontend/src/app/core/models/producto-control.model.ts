export type TipoProductoControl = 'PLAGA' | 'HONGO' | 'FERTILIZANTE';

export interface ControlPlaga {
  id: number;
  periodo_carencia: number;
}

export interface ControlHongo {
  id: number;
  periodo_carencia: number;
  nombre_hongo: string;
}

export interface ControlFertilizante {
  id: number;
  fecha_ultima_aplicacion: string;
}

export interface ProductoControl {
  id: number;
  registro_ica: string;
  nombre: string;
  frecuencia_aplicacion: number;
  valor: number;
  tipo: TipoProductoControl;
  controlPlaga?: ControlPlaga | null;
  controlHongo?: ControlHongo | null;
  controlFertilizante?: ControlFertilizante | null;
}
