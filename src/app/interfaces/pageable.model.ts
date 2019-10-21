export interface Pageable<T> {
    content: Array<T>, //dados que necessitamos
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number, // Total de Páginas
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    first: boolean,
    numberOfElements: number, 
    empty: boolean
}