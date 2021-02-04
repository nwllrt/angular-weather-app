import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IWeather} from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = 'API_KEY';
  private readonly units = 'metric';
  private readonly language = 'de';

  constructor(private httpClient: HttpClient) {
  }

  fetchWeather(location: string): Observable<IWeather> {
    const params = new HttpParams()
      .set('q', location)
      .set('units', this.units)
      .set('lang', this.language)
      .set('appid', this.apiKey);
    return this.httpClient.get<IWeather>(this.baseUrl, {params});
  }
}
