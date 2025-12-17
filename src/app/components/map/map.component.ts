import { AfterViewInit, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) { }

  @Input({ required: true }) guessLat!: number;
  @Input({ required: true }) guessLng!: number;
  @Input({ required: true }) actualLat!: number;
  @Input({ required: true }) actualLng!: number;

  distanceMeters = 0;

  private map!: L.Map;
  private layerGroup = L.layerGroup();

  ngAfterViewInit(): void {
    this.initializeMap();
    this.updateMap();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && this.inputsAreValid()) {
      this.updateMap();
    }
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      zoomControl: true,
      attributionControl: false,
      center: [(this.guessLat + this.actualLat) / 2, (this.guessLng + this.actualLng) / 2],

    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.layerGroup.addTo(this.map);
  }

  private updateMap(): void {
    this.layerGroup.clearLayers();

    //using latLng to mark on the map
    const guess = L.latLng(this.guessLat, this.guessLng);
    const actual = L.latLng(this.actualLat, this.actualLng);

    const guessMarker = L.marker(guess).bindPopup('Your Guess');
    const actualMarker = L.marker(actual).bindPopup('Correct Location');

    const line = L.polyline([guess, actual], {
      color: '#e53935',
      weight: 3,
      dashArray: '6,4',
    });

    // this.distanceMeters = Math.round(this.calculateDistance(guess, actual));

    this.layerGroup.addLayer(guessMarker);
    this.layerGroup.addLayer(actualMarker);
    this.layerGroup.addLayer(line);
    //finding distance with leaflet inbuilt feature distanceTo
    this.distanceMeters = Math.floor(guess.distanceTo(actual));
    this.cdr.detectChanges();

    // console.log('dist', this.distanceMeters, 'jfj', dist)

    this.map.fitBounds(L.latLngBounds([guess, actual]), {
      padding: [40, 40],
    });
  }
  private calculateDistance(a: L.LatLng, b: L.LatLng): number {
    return this.map?.distance(a, b);
  }

  private inputsAreValid(): boolean {
    return (
      isFinite(this.guessLat) &&
      isFinite(this.guessLng) &&
      isFinite(this.actualLat) &&
      isFinite(this.actualLng)
    );
  }

}
