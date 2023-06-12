import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss'],
})
export class BtnMyLocationComponent {
  private readonly mapService = inject(MapService);
  private readonly placesService = inject(PlacesService);

  protected goToMyLocation() {
    if (!this.mapService.IsMapReady) throw Error('Map not ready');
    if (!this.placesService.isUserLocationReady)
      throw Error('User location not ready');

    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
