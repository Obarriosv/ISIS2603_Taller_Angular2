import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { City } from '../../models/city.model';
import { WeatherRecord } from '../../models/weather-record.model';

import { WeatherRecordService } from '../../services/weather-record.service';
import { WeatherService, WeatherDetail } from '../../services/weather.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-detail.component.html'
})
export class CityDetailComponent implements OnChanges {

  private weatherRecordService = inject(WeatherRecordService);
  private weatherService = inject(WeatherService);

  @Input() city!: City;

  weatherRecords: WeatherRecord[] = [];
  weatherDetail: WeatherDetail | null = null;

  loadingWeather = false;
  loadingRecords = false;
  savingWeather = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.loadWeather();
      this.loadRecords();
    }
  }

  loadWeather(): void {
    this.loadingWeather = true;
    this.weatherDetail = null;

    this.weatherService.getWeather(this.city.name).subscribe({
      next: (weather: WeatherDetail) => {
        this.weatherDetail = weather;
        this.loadingWeather = false;
      },
      error: (error) => {
        console.error('Error cargando clima:', error);
        this.weatherDetail = null;
        this.loadingWeather = false;
      }
    });
  }

  loadRecords(): void {
    this.loadingRecords = true;

    this.weatherRecordService.getRecords(this.city.id).subscribe({
      next: (records: WeatherRecord[]) => {
        this.weatherRecords = records;
        this.loadingRecords = false;
      },
      error: (error) => {
        console.error('Error cargando historial:', error);
        this.weatherRecords = [];
        this.loadingRecords = false;
      }
    });
  }

  saveWeather(): void {
    if (!this.weatherDetail) {
      return;
    }

    this.savingWeather = true;

    const record = {
      tempC: this.weatherDetail.temp_c,
      condition: this.weatherDetail.condition,
      humidity: this.weatherDetail.humidity
    };

    this.weatherRecordService.createRecord(this.city.id, record).subscribe({
      next: () => {
        this.savingWeather = false;
        this.loadRecords();
      },
      error: (error) => {
        console.error('Error guardando clima:', error);
        this.savingWeather = false;
      }
    });
  }
}
