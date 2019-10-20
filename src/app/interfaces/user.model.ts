import { Empresa } from './empresa.model';
import { Permission } from './permission.model';
import { Page } from './page.model';

export interface User {
    id: number,
    email:string,
    userName: string, // Mostrar email na tela
    password:string,
    enabled: boolean, // ou active
    created: Date,
    modified: Date,
    idEmpresa: Empresa,
    page: Page
}