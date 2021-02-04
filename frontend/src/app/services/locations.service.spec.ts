import {TestBed} from '@angular/core/testing';

import {LocationsService} from './locations.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ILocation} from '../models/location';
import {IWeather} from '../models/weather';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(LocationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all locations', () => {
    const dummyLocations: Array<ILocation> = [
      {id: 1, location: 'Dortmund', timestamp: '1'},
      {id: 2, location: 'Berlin', timestamp: '2'}
    ];

    service.initLocations().subscribe(locations => {
      expect(locations.length).toBe(2);
      expect(locations).toEqual(dummyLocations);
    });

    const request = httpMock.expectOne('http://localhost:8080/locations');

    expect(request.request.method).toBe('GET');

    request.flush(dummyLocations);
  });

  it('should return the location that has been added', () => {
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

    const dummyLocation: ILocation = {id: 2935517, location: 'Dortmund', timestamp: '1'};

    service.addLocation(weather).subscribe(location => {
      expect(weather.id).toBe(location.id);
      expect(weather.name).toBe(location.location);
    });

    const request = httpMock.expectOne('http://localhost:8080/locations');

    expect(request.request.method).toBe('POST');

    request.flush(dummyLocation);
  });
});
