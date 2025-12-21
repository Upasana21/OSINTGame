import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

  private readonly earthRadiusInMeters = 6371000;
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = this.earthRadiusInMeters * c;

    return Math.round(distance);
  }
  //degree to radian
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
