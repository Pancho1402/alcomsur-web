import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reporter } from '../model/report.model';
import { MyHttpService } from '../my-http.service';

@Injectable({
    providedIn: 'root'
})

export class ReporterService{
    private apiUrl = 'http://alcomsur-app:8080/api/reportar'

    constructor(
        private http: HttpClient,
        private myHttpService: MyHttpService
    ){}
    
    getData(endPoint:{endPointID:number, endPointDate:string}): Observable<Reporter[]> {
        const headers:HttpHeaders = this.myHttpService.getHeaders();
        
        return this.http.get<Reporter[]>(`${this.apiUrl}/${endPoint.endPointID}/${endPoint.endPointDate}`, {headers} ).pipe(
            catchError(this.myHttpService.handleError)
        );
    }
}