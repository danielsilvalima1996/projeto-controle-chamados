import { Page } from './page.model';

export interface Permission {
    id: number,
    description: string,
    page: Array<Page>,
    created: Date,
    modified: Date,
    active: boolean,
    authority: Array<Permission>,
}