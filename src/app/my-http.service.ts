// my-http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyHttpService {
  
  constructor(private http: HttpClient) {}

  authenticate(credentials: { email: string; password: string }): Observable<string> {
    const authenticationUrl = 'http://alcomsur-app:8080/api/login';
    
    return this.http.post(authenticationUrl, credentials, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  clearAuthToken(){
    localStorage.removeItem('token');
  }

  getHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error('Error del lado del cliente:', error.error.message);
      console.error(
        `Código de error ${error.status}, ` + `cuerpo del error: ${error.error} `
      );
    }
    return throwError(
      'Algo salió mal; por favor, inténtalo de nuevo más tarde.'
    );
  }
  

}