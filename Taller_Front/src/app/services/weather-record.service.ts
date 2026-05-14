import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { WeatherRecord } from '../models/weather-record';

@Injectable({
  providedIn: 'root'
})
export class WeatherRecordService {

  constructor(private http: HttpClient) {}

  getRecords(cityId: number): Observable<WeatherRecord[]> {
    return this.http.get<WeatherRecord[]>(
      `${environment.apiUrl}/cities/${cityId}/weather-records`
    );
  }

  createRecord(cityId: number, record: Partial<WeatherRecord>): Observable<WeatherRecord> {
    return this.http.post<WeatherRecord>(
      `${environment.apiUrl}/cities/${cityId}/weather-records`,
      record
    );
  }
}
