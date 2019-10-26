import { TipoChamado } from './tipo-chamado.model';

export interface SubtipoChamado {
    id: number,
    descricao: string,
    created: Date,
    modified: Date,
    idTipoChamado: TipoChamado,
    active: Boolean
}