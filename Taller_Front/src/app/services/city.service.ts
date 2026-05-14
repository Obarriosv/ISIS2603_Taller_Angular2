import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}/cities`);
  }

  createCity(countryId: number, cityName: string): Observable<City> {
    const body = {
      name: cityName
    };

    return this.http.post<City>(
      `${environment.apiUrl}/countries/${countryId}/cities`,
      body
    );
  }
}