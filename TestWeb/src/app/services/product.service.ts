import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from '../model/product';
import { Global } from '../shared/Global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = Global.BASE_USER_ENDPOINT + '/v1/products';
  constructor(private http: HttpClient) { }

  // get all product data
  getAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(       
        catchError(this.handleError)
    );
  }

  // custom handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }   
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
