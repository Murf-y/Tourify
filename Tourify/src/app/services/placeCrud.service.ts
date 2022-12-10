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

  toggleFavorite(
    place_id: number,
    user_id: number,
    newIsFavorited: boolean
  ): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('place_id', place_id.toString());
    formData.append('user_id', user_id.toString());
    formData.append('is_favorited', newIsFavorited ? '1' : '0');
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('toggleFavorite')));
  }

  getAll(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id)
      .pipe(catchError(this.handleError<CrudResponse>('getAll')));
  }

  getAllFavorites(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id + '&favorites')
      .pipe(catchError(this.handleError<CrudResponse>('getAllFavorites')));
  }

  getAllPopular(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id + '&popular')
      .pipe(catchError(this.handleError<CrudResponse>('getAllPopular')));
  }

  getAllLatest(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id + '&latest')
      .pipe(catchError(this.handleError<CrudResponse>('getAllLatest')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
