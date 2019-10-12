import { Page } from './page.model'

export interface Role {
    id: number,
    name: string,
    active: boolean,
    created: Date,
    modified: Date,
    page: Page
}