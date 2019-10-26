import { Empresa } from './empresa.model';
import { Permission } from './permission.model';

export interface User {
    id: number,
    userName: string,
    fullName: string,
    password: string,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    enabled: boolean,
    permissions: Array<Permission>,
    created: Date,
    modified: Date,
    idEmpresa: Empresa,
    authorities: Array<Permission>,
    username: string,
    roles: Array<string>,
}