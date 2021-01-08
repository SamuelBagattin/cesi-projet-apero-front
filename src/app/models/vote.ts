import { Apero } from './apero';
import { Restaurant } from './restaurant';
import { User } from './user';

export interface Vote {
    id: number;
    date: Date;
    placeId: number;
    userId: number;
    happyHourid: number;
    user: User;
    happyHour: Apero;
    place: Restaurant;
}
