import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { IWeather } from './weather';
import { Subscription } from 'rxjs';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  errorMessage = '';
  sub!: Subscription;
  
  locationFilter = signal('');
  pageTitle: string = 'My Weather';

  filteredWeather = computed(() => this.performFilter(this.locationFilter()));
  weather: IWeather[] = [];

  constructor(private weatherService: WeatherService) {}

  performFilter(filterBy: string): IWeather[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.weather.filter((aWeather: IWeather) =>
    aWeather.zip.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.weatherService.getWeather().subscribe({
      next: weather => {
        this.weather = weather;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFilterChange(value: string) {
    this.locationFilter.set(value);
  }
}
