import { Empresa } from './empresa.model';
import { Analista } from './analista.model';
import { TipoChamado } from './tipo-chamado.model';
import { SubtipoChamado } from './subtipo-chamado.model';
import { User } from './user.model';
import { Tecnico } from './tecnico.model';

export interface Chamados {
    id: number;
    idUsuario: User;
    idTecnico: Tecnico;
    dataAbertura: Date;
    dataFechamento: Date;
    statusChamado: number;
    idTipoChamado: TipoChamado;
    idSubtipoChamado: SubtipoChamado;
    descricao: string;
    criado: Date;
    modificado: Date;
    criadoPor: string;
    modificadoPor: string;
    idComentarioChamado:Array<any>;
}