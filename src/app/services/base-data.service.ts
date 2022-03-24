import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ApplicationHttpClient {

    private api = environment.domain;

    public constructor(public http: HttpClient) {
    }

    /**
     * GET request
     */
    public get<T>(endPoint: string): Observable<T> {
        return this.http.get<T>(this.api + endPoint);
    }
}
