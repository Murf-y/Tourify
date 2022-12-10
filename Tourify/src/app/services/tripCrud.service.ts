import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudResponse } from 'app/models/crud';
import { environment } from 'environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripCrudService {
  endpoint = environment.server_path + 'trip.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  createTrip(
    user_id: number,
    name: string,
    start_date: string,
    end_date: string
  ): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('name', name);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);

    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData, this.httpOptions)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}