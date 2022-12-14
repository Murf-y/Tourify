import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudResponse } from 'app/models/crud';
import { environment } from 'environments/environment';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordCrudService {
  endpoint = environment.server_path + 'forgotPassword.php';

  // add cross origin headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  postReset(email: string): Observable<CrudResponse> {
    let data = new FormData();
    data.append('email', email);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, data)
      .pipe(catchError(this.handleError<CrudResponse>('postReset')));
  }

  resetPassWithCode(code: string, password: string): Observable<CrudResponse> {
    let data = new FormData();
    data.append('code', code);
    data.append('new_pass', password);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, data)
      .pipe(catchError(this.handleError<CrudResponse>('resetPassWithCode')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
