import { Usuario } from './usuario.model';

export interface Tecnico {
    id: number;
    ativo: boolean;
    idUsuario: Usuario;
    criado: Date;
    modificado: Date;
    criadoPor: string;
    modificadoPor: string;
}