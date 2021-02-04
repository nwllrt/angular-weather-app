import {Component, OnInit} from '@angular/core';
import {IWeather} from '../models/weather';
import {RepositoryService} from '../services/repository.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: IWeather;
  error: string;
  showErrorMessage = false;
  inputLocation: string;
  isAddToLocationsActive: boolean;

  constructor(private repositoryService: RepositoryService) {
    this.isAddToLocationsActive = false;
  }

  ngOnInit(): void {
    this.repositoryService.getWeather().subscribe(weather => {
      if (weather === null) {
        this.weather = null;
        this.showErrorMessage = true;
        this.error = 'Keine Daten zu diesem Ort verfügbar';
      } else {
        this.weather = weather;
        this.showErrorMessage = false;
        this.inputLocation = weather.name;
      }
    });

    this.repositoryService.getAddToLocationsButtonState().subscribe(isActive => this.isAddToLocationsActive = isActive);
  }

  onGetWeatherData(): void {
    this.repositoryService.fetchWeather(this.inputLocation);
  }

  onAddLocation(): void {
    this.repositoryService.addLocation(this.weather);
  }
}
