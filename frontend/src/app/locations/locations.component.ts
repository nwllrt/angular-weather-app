import {Component, OnInit} from '@angular/core';
import {ILocation} from '../models/location';
import {RepositoryService} from '../services/repository.service';
import {SortType} from '../models/sort-type';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Array<ILocation>;
  selectedIndex: number;
  sortType: SortType;
  SortType = SortType;

  constructor(private repositoryService: RepositoryService) {
    this.sortType = SortType.DateAscending;
  }

  ngOnInit(): void {
    this.repositoryService.initLocations();
    this.repositoryService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
    this.repositoryService.getSelectedLocation().subscribe(location => {
      if (location === undefined) {
        this.selectedIndex = undefined;
      } else {
        this.selectedIndex = this.locations.findIndex(loc => loc.id === location.id);
      }
    });
  }

  onDeleteLocation(location: ILocation, event): void {
    event.stopPropagation();
    // if / else Anweisung nur ausführen, wenn delete funktioniert hat
    if (this.selectedIndex > this.locations.indexOf(location)) {
      this.selectedIndex--;
    } else if (this.selectedIndex === this.locations.indexOf(location)) {
      this.selectedIndex = null;
    }
    this.repositoryService.deleteLocation(location);
  }

  onLocationClicked(index: number, location: ILocation): void {
    this.selectedIndex = index;
    this.repositoryService.fetchWeather(location.location);
  }

  onSort(sortType: SortType) {
    this.sortType = sortType;
    this.repositoryService.sortLocations(sortType);
  }

  getDate(timestamp: string): string {
    const date: Date = new Date(timestamp);
    return (date.getDate()) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
}
