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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
