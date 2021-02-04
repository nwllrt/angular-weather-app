import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILocation} from '../models/location';
import {IWeather} from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  initLocations(): Observable<Array<ILocation>> {
    return this.httpClient.get<Array<ILocation>>(this.baseUrl + '/locations');
  }

  addLocation(weather: IWeather): Observable<ILocation> {
    return this.httpClient.post<ILocation>(this.baseUrl + '/locations', {id: weather.id, location: weather.name});
  }

  deleteLocation(location: ILocation): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + '/locations/' + location.id);
  }
}
