import { User } from './user';

export interface Apero {
    id: number;
    nom: string;
    dateApero: Date;
    dateCreation: Date;
    createur_Id: number;
    user: User;
}
