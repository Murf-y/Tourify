import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';
import { CrudResponse } from 'app/models/crud';

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  endpoint = environment.server_path + 'user.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createUser(
    username: string,
    email: string,
    password: string
  ): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  loginUser(email: string, password: string): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  getUser(user_id: number): Observable<CrudResponse> {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?user_id=' + user_id)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  getLeaderboard(page: number) {
    return this.httpClient
      .get<CrudResponse>(this.endpoint + '?page=' + page)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  updateProfilePhoto(
    user_id: number,
    base64: string
  ): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('profile_photo', base64);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
      .pipe(catchError(this.handleError<CrudResponse>('Error occured')));
  }

  updateUsername(user_id: number, username: string): Observable<CrudResponse> {
    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('username', username);
    return this.httpClient
      .post<CrudResponse>(this.endpoint, formData)
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
