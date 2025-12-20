import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }
  calculateScore(distanceMeters: number): number {
    if (distanceMeters === 0) return 15;
    if (distanceMeters > 50) return 0;
    /*MaxPoint =15, minPoint=1 on right guess, greater than 50m =0,
     between 50-0m=> points calculated based on this formula
    Formula: MaxPoints - (distance * (MaxPoints - MinPoints) / MaxDistance)
    */
    const points = 15 - (distanceMeters * (14 / 50));
    return Math.max(0, Math.round(points));
  }
  // calculateScore(distanceinKm: number): number {
  //   if (distanceinKm === 0) return 15;
  //   if (distanceinKm > 5) return 0; 
  //   const points = 15 - (distanceinKm * (14 / 5));
  //   return Math.max(0, Math.round(points));
  // }
}
