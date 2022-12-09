import { Category } from '../category';

export interface Place {
  id: number;
  name: string;
  district: string;
  city: string;
  description: string;
  photo_url: string;
  category: Category;
  tags: string[];
  isFavorited: boolean;
}
