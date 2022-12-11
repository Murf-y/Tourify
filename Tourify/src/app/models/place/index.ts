import { Category } from '../category';

export interface Place {
  id: number;
  name: string;
  district: string;
  city: string;
  overview: string;
  photo_url: string;
  category: Category;
  added_at: string;
  tags: string[];
  isFavorited: boolean;
  numberOfReviews: number;
  rating: number;
}
