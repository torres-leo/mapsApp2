import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoibHRvcnJlczI0IiwiYSI6ImNsZ2t6amN6YTAxcjAzbG9maXgzOGZyemUifQ.CLcuGSqHrMOxOjTC6LnsNw';

if (!navigator.geolocation) {
  alert('Geolocation is not available');
  throw new Error('Geolocation is not available');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
