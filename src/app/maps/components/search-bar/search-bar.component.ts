import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  private readonly placesService = inject(PlacesService);
  private readonly mapService = inject(MapService);

  private debounceTimer?: NodeJS.Timeout;

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    if (query === '') {
      this.mapService.clearMarkers();
      this.mapService.flyTo(this.placesService.userLocation!);
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
    }, 1000);
  }
}
