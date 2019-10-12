import { Empresa } from './empresa.model';
import { Analista } from './analista.model';
import { TipoChamado } from './tipo-chamado.model';
import { SubtipoChamado } from './subtipo-chamado.model';

export interface Chamados {
    idChamado: number,
    idEmpresa: Empresa,
    idAnalista: Analista,
    dataAbertura: Date,
    horaAbertura: string,
    dataFechamento: Date,
    horaFechamento: string,
    tempoChamado: string,
    codigoStatusChamado: number,
    tipoChamado: TipoChamado,
    subtipoChamado: SubtipoChamado,
    descricaoChamado: string,
    solucaoChamado: string,
}