import { Category } from '../category';

export interface Site {
  id: number;
  name: string;
  location: string;
  description: string;
  image_path: string;
  category: Category;
  tags: string[];
  isFavorite: boolean;
}
