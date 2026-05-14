import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';

export interface WeatherDetail {
  temp_c: number;
  condition: string;
  humidity: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = environment.weatherApiKey;
  private weatherApiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<WeatherDetail> {
    const url = `${this.weatherApiUrl}/current.json?key=${this.apiKey}&q=${cityName}`;

    return this.http.get<any>(url).pipe(
      map(res => ({
        temp_c: res.current.temp_c,
        condition: res.current.condition.text,
        humidity: res.current.humidity
      }))
    );
  }
}
