import { User } from './user.model';

export interface Login {
    user: User,
    token: string
}