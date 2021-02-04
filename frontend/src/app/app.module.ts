import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LocationsComponent} from './locations/locations.component';
import {WeatherComponent} from './weather/weather.component';
import {FormsModule} from '@angular/forms';
import {WeatherService} from './services/weather.service';
import {LocationsService} from './services/locations.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {SimplebarAngularModule} from 'simplebar-angular';
import {RepositoryService} from './services/repository.service';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,

    SimplebarAngularModule
  ],
  providers: [
    WeatherService,
    LocationsService,

    RepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
