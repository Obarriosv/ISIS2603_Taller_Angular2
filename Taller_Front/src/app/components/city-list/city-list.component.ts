import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { City } from '../../models/city.model';
import { CityService } from '../../services/city.service';
import { CityCreateComponent } from '../city-create/city-create.component';
import { CityDetailComponent } from '../city-detail/city-detail.component';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, CityCreateComponent, CityDetailComponent],
  templateUrl: './city-list.component.html'
})
export class CityListComponent implements OnInit {

  private cityService = inject(CityService);

  cities: City[] = [];
  selectedCity: City | null = null;
  showCreateForm = false;

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    console.log('Intentando cargar ciudades...');

    this.cityService.getCities().subscribe({
      next: (cities: City[]) => {
        console.log('Ciudades cargadas:', cities);
        this.cities = cities;
      },
      error: (error) => {
        console.error('Error cargando ciudades:', error);
      }
    });
  }

  selectCity(city: City): void {
    this.selectedCity = city;
  }

  openCreateForm(): void {
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
  }

  onCityCreated(city: City): void {
    this.showCreateForm = false;
    this.selectedCity = city;
    this.loadCities();
  }
}
