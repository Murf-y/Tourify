import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudResponse } from 'app/models/crud';
import { environment } from 'environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceCrudService {
  endpoint = environment.server_path + 'place.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id)
      .pipe(catchError(this.handleError<CrudResponse>('getAll')));
  }

  favoritePlace(place_id: number, user_id: number): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('place_id', place_id.toString());
    formData.append('user_id', user_id.toString());
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('favoritePlace')));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
