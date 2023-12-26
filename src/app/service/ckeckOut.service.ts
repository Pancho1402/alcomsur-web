import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICheckOut } from '../model/checkOut.model';
import { MyHttpService } from '../my-http.service';

@Injectable({
    providedIn: 'root'
})

export class CheckOutService{
    
  private apiUrl= 'http://alcomsur-app:8080/api/devolucion';
  
  constructor(
    private http:HttpClient,
    private myHttpService: MyHttpService
  ){}

  getData(endpoint:{endPointCompany:string | null, endPointDate:string | null}): Observable<ICheckOut[]> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();

    return this.http.get<ICheckOut[]>(`${this.apiUrl}/${endpoint.endPointCompany}/${endpoint.endPointDate}`, {headers}).pipe(
      catchError(this.myHttpService.handleError),
    );
  }
    
}