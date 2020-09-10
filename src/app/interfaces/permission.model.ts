import { Pagina } from './pagina.model';

export interface Permission {
    id: number,
    description: string,
    page: Array<Pagina>,
    created: Date,
    modified: Date,
    active: boolean,
    authority: Array<Permission>,
}