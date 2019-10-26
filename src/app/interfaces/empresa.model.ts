export interface Empresa {
    id: number,
    ativo: boolean,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    endereco: string,
    codigoTotvs: string,
    admin: string,
    telefone: string,
    criado: Date,
    modificado: Date
}