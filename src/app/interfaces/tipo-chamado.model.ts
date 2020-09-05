
export interface TipoChamado {
    id: number,
    descricao: string,
    criado: Date,
    modificado: Date,
    ativo: Boolean,
    criadoPor: string,
    modificadoPor: string,
    idSubtipoChamado:string
}