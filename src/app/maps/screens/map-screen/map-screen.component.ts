import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.scss'],
})
export class MapScreenComponent {
  private readonly placeService = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placeService.isUserLocationReady;
  }
}
