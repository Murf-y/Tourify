import { Place } from '../place';
import { User } from '../user';

export interface Review {
  id: number;
  rating: string;
  review: string;
  review_at: string;
  author: User;
  place_id: number;
}
