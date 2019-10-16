import { Empresa } from './empresa.model';
import { Role } from './role.model';

export interface User {
    id: number,
    email:string,
    username: string,
    password:string,
    active: boolean,
    created: Date,
    modified: Date,
    idEmpresa: Empresa,
    idRole: Role
}