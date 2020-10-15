import { PoMenuItem } from '@po-ui/ng-components';
import { Regra } from './regra.model';

export interface LoginRetorno {
    token: string,
    id: number,
    avatar: string,
    email: string,
    nomeCompleto: string,
    ativo: boolean,
    regra: Regra,
    menu: Array<PoMenuItem>
}

export interface LoginEnvio {
    username: string,
    password: string
}