import { User } from './user.model';

export interface Tecnico {
    id: number;
    ativo: boolean;
    idUsuario: User;
    criado: Date;
    modificado: Date;
    criadoPor: string;
    modificadoPor: string;
}