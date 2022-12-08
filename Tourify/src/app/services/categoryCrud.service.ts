import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { CrudResponse } from 'app/models/crud';

@Injectable({
  providedIn: 'root',
})
export class CategoryCrudService {
  endpoint = environment.server_path + 'category.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint)
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
