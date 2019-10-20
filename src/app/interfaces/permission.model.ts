import { Page } from './page.model'

export interface Permission {
    id: number,
    description: string,
    active: boolean,
    created: Date,
    modified: Date,
    permission_page: Page
}