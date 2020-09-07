import { TipoChamado } from './tipo-chamado.model';

export interface SubtipoChamado {
    id: number,
    descricao: string,
    criado: Date,
    modificado: Date,
    idTipoChamado: TipoChamado,
    ativo: Boolean,
    modificadoPor: string,
    criadoPor: string
}