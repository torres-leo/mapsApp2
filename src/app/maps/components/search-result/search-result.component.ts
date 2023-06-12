import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  private readonly placesService = inject(PlacesService);
  private readonly mapService = inject(MapService);
  protected selectedId: string = '';

  get IsLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get Places(): Feature[] {
    return this.placesService.places;
  }

  flyToPlace(place: Feature) {
    const [lng, lat] = place.center;
    this.selectedId = place.id;

    this.mapService.flyTo([lng, lat]);
  }
}
