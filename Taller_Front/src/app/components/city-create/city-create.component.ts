import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Country } from '../../models/country.model';
import { City } from '../../models/city.model';

import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {

  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  @Output() cityCreated = new EventEmitter<City>();
  @Output() cancel = new EventEmitter<void>();

  countries: Country[] = [];

  cityName = '';
  selectedCountryId: number | null = null;

  loadingCountries = false;
  saving = false;

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loadingCountries = true;

    this.countryService.getCountries().subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.loadingCountries = false;
      },
      error: () => {
        this.loadingCountries = false;
      }
    });
  }

  save(): void {
    if (!this.cityName.trim() || this.selectedCountryId === null) {
      return;
    }

    this.saving = true;

    this.cityService.createCity(this.selectedCountryId, this.cityName.trim()).subscribe({
      next: (city: City) => {
        this.saving = false;
        this.cityCreated.emit(city);
        this.cityName = '';
        this.selectedCountryId = null;
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  cancelForm(): void {
    this.cancel.emit();
  }

  formInvalid(): boolean {
    return !this.cityName.trim() || this.selectedCountryId === null || this.saving;
  }
}