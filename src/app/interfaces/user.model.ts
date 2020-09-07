import { Empresa } from './empresa.model';
import { Permission } from './permission.model';
import { Regras } from './regra.model';

export interface User {
    id: number;
    email: string;
    senha:string;
    nomeCompleto:string;
    avatar: string;
    ativo: boolean;
    idRegra:Regras;
    idEmpresa:Empresa;
    isTecnico:boolean;
    criado: Date;
    modificado:Date;
    criadoPor: string;
    modificadoPor:string;
    dddCelular: string;
    celular:string;
    dddTelefone: string;
    telefone:string
}