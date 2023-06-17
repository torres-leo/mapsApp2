import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { delay } from 'rxjs';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly HttpPlacesAPI = inject(PlacesApiClient);
  private readonly mapService = inject(MapService);

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private readonly http: HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.userLocation = [coords.longitude, coords.latitude];
        resolve(this.userLocation);
      }),
        (error: Object) => {
          alert('Error getting user location');
          console.log(error);
          reject(error);
        };
    });
  }

  public getPlacesByQuery(query: string = '') {
    if (!this.userLocation) throw Error('User location not ready');

    if (query === '') {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    this.isLoadingPlaces = true;

    this.HttpPlacesAPI.get<PlacesResponse>(`/${query}.json`, {
      params: {
        // proximity: `${this.userLocation?.[0]},${this.userLocation?.[1]}`,
        proximity: this.userLocation.join(','),
      },
    })
      .pipe(delay(2000))
      .subscribe({
        next: (response) => {
          this.places = response.features;
        },
        error: (error) => {
          alert('Error getting places');
          console.log(error);
        },
        complete: () => {
          this.isLoadingPlaces = false;
          this.mapService.createMarkerFromPlaces(
            this.places,
            this.userLocation!
          );
        },
      });

    // .subscribe((response) => {
    //   console.log(response.features);
    //   this.isLoadingPlaces = false;
    //   this.places = response.features;
    // });
  }

  hidePlaces() {
    this.places = [];
  }
}
