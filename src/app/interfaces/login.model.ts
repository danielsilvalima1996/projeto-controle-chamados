export interface LoginRetorno {
    avatar: string;
    id: number;
    email: string;
    token: string;
    nomeCompleto: string;
    ativo: boolean
}

export interface LoginEnvio {
    username: string,
    password: string
}