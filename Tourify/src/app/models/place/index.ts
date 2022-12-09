import { Category } from '../category';

export interface Place {
  id: number;
  name: string;
  location: string;
  description: string;
  image_path: string;
  category: Category;
  tags: string[];
  isFavorited: boolean;
}
