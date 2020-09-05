export interface Empresa {
    id: number;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    numero: string;
    criado: Date;
    modificado: Date;
    criadoPor: Date;
    modificadoPor: Date;
    ativo: boolean;
}