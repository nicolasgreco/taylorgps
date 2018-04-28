import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Trip} from '../models/trip';
import {Route} from '../models/route';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class TripService {

  private tripsUrl = 'api/trips';  // URL to web api

  constructor(private http: HttpClient) { }


  /** GET hero by id. Return `undefined` when id not found */
  getTripNo404<Data>(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip[]>(url)
      .pipe(
        map(trips => trips[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Trip>(`getTrip id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getTrip(id: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip>(url).pipe(
      catchError(this.handleError<Trip>(`getTrip id=${id}`))
    );
  }

  getRoute(tripId: number, routeId: number): Observable<Route> {
    const url = `${this.tripsUrl}/${tripId}/routes/${routeId}`;
    return this.http.get<Route>(url).pipe(
      catchError(this.handleError<Route>(`getRoute id=${routeId}`))
    );
  }

  getRoutes(id: number): Observable<Route[]> {
    const url = `${this.tripsUrl}/${id}/routes`;
    return this.http.get<Route[]>(url).pipe(
      catchError(this.handleError('getRoutes', []))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
