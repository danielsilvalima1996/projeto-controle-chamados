import { TipoChamado } from './tipo-chamado.model';
import { SubtipoChamado } from './subtipo-chamado.model';
import { Usuario } from './usuario.model';
import { Tecnico } from './tecnico.model';

export interface Chamados {
    id: number;
    idUsuario: Usuario;
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