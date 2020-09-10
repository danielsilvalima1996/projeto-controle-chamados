import { Pagina } from './pagina.model';

export interface Regra {
    id: number;
    descricao: string;
    ativo: boolean;
    criado: Date;
    modificado: Date;
    criadoPor: string;
    modificadoPor: string;
    idPagina: Array<Pagina>,
    quantidadePagina: number
}