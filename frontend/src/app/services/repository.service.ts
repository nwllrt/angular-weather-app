import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IWeather} from '../models/weather';
import {ILocation} from '../models/location';
import {LocationsService} from './locations.service';
import {WeatherService} from './weather.service';
import {SortType} from '../models/sort-type';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  weather: IWeather;

  locations: Array<ILocation>;

  private weatherSubject: Subject<IWeather> = new Subject<IWeather>();

  private locationsSubject: Subject<Array<ILocation>> = new Subject<Array<ILocation>>();

  private selectedLocation: Subject<ILocation> = new Subject<ILocation>();

  private addToLocationsButtonState: Subject<boolean> = new Subject<boolean>();

  constructor(private locationsService: LocationsService, private weatherService: WeatherService) {
  }

  fetchWeather(location: string) {
    this.weatherService.fetchWeather(location).subscribe(weather => {
        this.weather = weather;
        this.weatherSubject.next(weather);
        this.selectedLocation.next(this.locations.find(loc => loc.id === weather.id));
        this.addToLocationsButtonState.next(this.locations.filter(currentLoc => currentLoc.id === weather.id).length === 0);
      },
      error => {
        this.addToLocationsButtonState.next(false);
        this.weatherSubject.next(null);
      });
  }

  initLocations() {
    this.locationsService.initLocations().subscribe(locations => {
      this.locations = locations;
      this.locationsSubject.next(locations);
    });
  }

  addLocation(weather: IWeather) {
    this.locationsService.addLocation(weather).subscribe(location => {
      this.locations.push(location);
      this.locationsSubject.next(this.locations);
      this.selectedLocation.next(location);
      this.addToLocationsButtonState.next(false);
    });
  }

  deleteLocation(location: ILocation) {
    this.locationsService.deleteLocation(location).subscribe(() => {
      this.locations = this.locations.filter(loc => loc.id !== location.id);
      this.locationsSubject.next(this.locations);
      if (this.weather !== undefined && this.weather.id === location.id) {
        this.selectedLocation.next(undefined);
        this.addToLocationsButtonState.next(true);
      }
    });
  }

  sortLocations(sortType: SortType) {
    this.sort(sortType);
    this.locationsSubject.next(this.locations);
  }

  private sort(sortType: SortType) {
    let aLessThanB: number;
    let aGreaterThanB: number;
    if (sortType === SortType.DateAscending || sortType === SortType.LocationAscending) {
      aLessThanB = -1;
      aGreaterThanB = 1;
    } else {
      aLessThanB = 1;
      aGreaterThanB = -1;
    }
    if (sortType === SortType.LocationAscending || sortType === SortType.LocationDescending) {
      this.locations.sort((a, b) => {
        if (a.location < b.location) {
          return aLessThanB;
        } else if (a.location > b.location) {
          return aGreaterThanB;
        } else {
          return 0;
        }
      });
    } else {
      this.locations.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return aLessThanB;
        } else if (a.timestamp > b.timestamp) {
          return aGreaterThanB;
        } else {
          return 0;
        }
      });
    }
  }

  getWeather(): Observable<IWeather> {
    return this.weatherSubject.asObservable();
  }

  getLocations(): Observable<Array<ILocation>> {
    return this.locationsSubject.asObservable();
  }

  getSelectedLocation(): Observable<ILocation> {
    return this.selectedLocation.asObservable();
  }

  getAddToLocationsButtonState(): Observable<boolean> {
    return this.addToLocationsButtonState.asObservable();
  }
}
