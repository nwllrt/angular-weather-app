import {TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IWeather} from '../models/weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data', () => {
    const input = 'Dortmund';
    const weather: IWeather =
      {
        coord: {lon: 7.45, lat: 51.52},
        weather: [{id: 800, main: 'Clear', description: 'Klarer Himmel', icon: '01d'}],
        base: 'stations',
        main: {temp: 19.2, feels_like: 15.98, temp_min: 17, temp_max: 20.56, pressure: 1021, humidity: 45},
        visibility: 10000,
        wind: {speed: 3.6, deg: 50},
        clouds: {all: 0},
        dt: 1587635050,
        sys: {type: 1, id: 1306, country: 'DE', sunrise: 1587615407, sunset: 1587667186},
        timezone: 7200,
        id: 2935517,
        name: 'Dortmund',
        cod: 200
      };

    service.fetchWeather('Dortmund').subscribe(locations => {
      expect(input).toBe(locations.name);
    });

    const request = httpMock.expectOne('http://api.openweathermap.org/data/2.5/weather?q=Dortmund&units=metric&lang=de&appid=4a2048aa6bcd7c7d6a881480ab6f434d');

    expect(request.request.method).toBe('GET');

    request.flush(weather);
  });
});
