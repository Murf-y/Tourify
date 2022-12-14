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

  getPlace(user_id: number, place_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(
        this.endpoint + '?user_id=' + user_id + '&place_id=' + place_id
      )
      .pipe(catchError(this.handleError<CrudResponse>('getPlace')));
  }

  getPlacesByCategory(
    user_id: number,
    category_id: number
  ): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(
        this.endpoint + '?user_id=' + user_id + '&category_id=' + category_id
      )
      .pipe(catchError(this.handleError<CrudResponse>('getPlacesByCategory')));
  }
  getPlacesByCategoryPopular(
    user_id: number,
    category_id: number
  ): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(
        this.endpoint +
          '?user_id=' +
          user_id +
          '&category_id=' +
          category_id +
          '&popular'
      )
      .pipe(
        catchError(this.handleError<CrudResponse>('getPlacesByCategoryPopular'))
      );
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

  postReviewToPlace(
    place_id: number,
    user_id: number,
    rating: number,
    review: string
  ) {
    const formData = new FormData();
    formData.append('place_id', place_id.toString());
    formData.append('user_id', user_id.toString());
    formData.append('rating', rating.toString());
    formData.append('review', review);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('postReviewToPlace')));
  }

  reportPlace(place_id: number, user_id: number, reason: string) {
    const formData = new FormData();
    formData.append('place_id', place_id.toString());
    formData.append('user_id', user_id.toString());
    formData.append('report_reason', reason);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('reportPlace')));
  }

  search(searchTerm: string): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?search=' + searchTerm)
      .pipe(catchError(this.handleError<CrudResponse>('search')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
