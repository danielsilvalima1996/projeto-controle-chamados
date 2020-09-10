export interface Pagina {
    id: number,
    link: string,
    icon: string,
    label: string,
    shortLabel: string,
    ativo: boolean,
    criado: Date,
    modificado: Date,
    criadoPor: string,
    modificadoPor: string,
    parent: number,
    quantidadePagina?: number
}