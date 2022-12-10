import { Place } from '../place';

export interface Trip {
  places: Place[];
  start_date: string;
  end_date: string;
  name: string;
  id: string;
  added_at: string;
}
