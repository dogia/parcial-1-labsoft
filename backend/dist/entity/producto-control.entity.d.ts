import { Labor } from './labor.entity';
import { ControlPlaga } from './control-plaga.entity';
import { ControlHongo } from './control-hongo.entity';
import { ControlFertilizante } from './control-fertilizante.entity';
export declare class ProductoControl {
    id: number;
    registro_ica: string;
    nombre: string;
    frecuencia_aplicacion: number;
    valor: number;
    tipo: string;
    labores: Labor[];
    controlPlaga: ControlPlaga;
    controlHongo: ControlHongo;
    controlFertilizante: ControlFertilizante;
}
