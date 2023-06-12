import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;

  get IsMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.map) {
      alert('Map not ready');
      throw Error('Map not ready');
    }

    this.map.flyTo({ center: coords, zoom: 16 });
  }
}
