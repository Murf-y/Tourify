import { Category } from '../category';
import { Review } from '../review';

export interface Place {
  id: number;
  name: string;
  district: string;
  city: string;
  overview: string;
  photo_url: string;
  category: Category;
  reviews: Review[];
  added_at: string;
  tags: string[];
  isFavorited: boolean;
  latitude: string;
  longitude: string;
}
