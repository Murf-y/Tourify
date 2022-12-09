import { Category } from '../category';

export interface Place {
  id: number;
  name: string;
  location: string;
  description: string;
  photo_url: string;
  category: Category;
  tags: string[];
  isFavorited: boolean;
}
