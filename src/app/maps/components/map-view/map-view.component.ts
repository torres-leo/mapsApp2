import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapElement!: ElementRef;

  private readonly placeService = inject(PlacesService);
  private readonly mapService = inject(MapService);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.placeService.userLocation) throw Error('User location not ready');

    const instanceMap = new Map({
      container: this.mapElement.nativeElement, // container ID
      // style: 'mapbox://styles/mapbox/dark-v10', // style URL
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup({ offset: 25 }).setHTML(`<h5>Home</h5>`);

    new Marker({ color: 'red' })
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(instanceMap);

    this.mapService.setMap(instanceMap);
  }
}
