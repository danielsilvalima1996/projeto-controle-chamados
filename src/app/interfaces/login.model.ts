import { PoMenuItem } from '@po-ui/ng-components';

export interface LoginRetorno {
    avatar: string;
    id: number;
    email: string;
    token: string;
    nomeCompleto: string;
    ativo: boolean,
    menu: Array<PoMenuItem>
}

export interface LoginEnvio {
    username: string,
    password: string
}