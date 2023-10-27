import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { IWeather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d81a8dba412c3cdcdf4154eb157d8317';

  constructor(private http: HttpClient) { }

  getWeather(): Observable<IWeather[]> {
    return this.http.get<IWeather[]>(this.weatherUrl)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );;
  }

  getAWeather(zip: string): Observable<IWeather | undefined> {
    return this.getWeather()
      .pipe(
        map((weather: IWeather[]) => weather.find(w => w.zip === zip))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
