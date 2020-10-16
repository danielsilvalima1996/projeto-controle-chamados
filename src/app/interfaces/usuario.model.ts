import { Empresa } from './empresa.model';
import { Regra } from './regra.model';

export interface Usuario {
    id: number;
    email: string;
    senha: string;
    nomeCompleto: string;
    avatar: string;
    ativo: boolean;
    idRegra: Regra;
    idEmpresa: Empresa;
    criado: Date;
    modificado: Date;
    criadoPor: string;
    modificadoPor: string;
    dddCelular: string;
    celular: string;
    dddTelefone: string;
    telefone: string
}