import { AfterViewInit, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  constructor() { }
  public data = inject(MAT_DIALOG_DATA);

  guessLat: number = this.data.guessLat || 0;
  guessLng: number = this.data.guessLng || 0;
  actualLat: number = this.data.actualLat || 0;
  actualLng: number = this.data.actualLng || 0;

  distanceMeters = 0;

  private map!: L.Map;
  private layerGroup = L.layerGroup();

  ngAfterViewInit(): void {
    this.initializeMap();
    this.updateMap();
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      zoomControl: true,
      attributionControl: false,
      center: [
        (this.guessLat + this.actualLat) / 2,
        (this.guessLng + this.actualLng) / 2,
      ],
    });
    this.map.setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.layerGroup.addTo(this.map);
  }

  private updateMap(): void {
    this.layerGroup.clearLayers();

    const guess = L.latLng(this.guessLat, this.guessLng);
    const actual = L.latLng(this.actualLat, this.actualLng);

    const guessMarker = L.marker(guess, {
      icon: this.createColoredIcon('#4caf50'),
    }).bindPopup('Your Guess');
    const actualMarker = L.marker(actual, {
      icon: this.createColoredIcon('#f44336'),
    }).bindPopup('Correct Location');

    const line = L.polyline([guess, actual], {
      color: '#cc0f0bff',
      weight: 3,
      dashArray: '6,4',
    }).addTo(this.map);

    this.layerGroup.addLayer(guessMarker);
    this.layerGroup.addLayer(actualMarker);

    this.map.flyToBounds(L.latLngBounds([guess, actual]), {
      padding: [100, 100],
      duration: 1.5,
    });

    this.distanceMeters = Math.floor(guess.distanceTo(actual));
    this.showDistancePopup(line);
  }

  createColoredIcon(color: string): any {
    return L.divIcon({
      className: 'custom-marker',
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -30],
    });
  }

  showDistancePopup(line: any): void {
    const distancePopup = L.popup()
      .setLatLng(line.getBounds().getCenter())
      .setContent(`Distance: ${this.distanceMeters} m`)
      .openOn(this.map);

    setTimeout(() => {
      this.map.closePopup(distancePopup);
    }, 2000);
  }
}
