export interface Page {
    id: number,
    created: Date,
    modified: Date,
    icon: string,
    label: string,
    shortLabel: string,
    link: string,
    parent: number
}