import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { DrinksModel } from "../models/Drinks.model";
import { ApplicationHttpClient } from "./base-data.service";

@Injectable({ providedIn: "root" })
export class CoctailsService {


  constructor(
    private appHttpClient: ApplicationHttpClient,
  ) {}

  getAllCoctails(letter: string): Observable<DrinksModel> {
    return this.appHttpClient.get<DrinksModel>(environment.endpoints.coctails.search + '?f=' + letter)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error))
      })
    );
  }

  getCoctailById(id: string): Observable<DrinksModel> {
    return this.appHttpClient.get<DrinksModel>(environment.endpoints.coctails.lookup + '?i=' + id)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error))
      })
    );
  }

  getCoctailByName(name: string): Observable<DrinksModel> {
    return this.appHttpClient.get<DrinksModel>(environment.endpoints.coctails.search + '?s=' + name)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error))
      })
    );
  }

  filterByCategory(category: string): Observable<DrinksModel> {
    return this.appHttpClient.get<DrinksModel>(environment.endpoints.coctails.filter + '?c=' + category)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error))
      })
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.appHttpClient.get(environment.endpoints.coctails.list + '?c=list')
    .pipe(
      map((list: any) => {
        let mapList: string[] = list.drinks?.map((category: any) => category.strCategory);
        return mapList;
      }),
      catchError(error => {
        return throwError(() => new Error(error))
      })
    );
  }
}
