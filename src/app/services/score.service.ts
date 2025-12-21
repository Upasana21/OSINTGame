import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }
  readonly totalScore = signal<number>(Number(localStorage.getItem('lastScore')) || 0);

  calculateScore(distanceMeters: number): number {
    if (distanceMeters === 0) return 15;
    if (distanceMeters > 50) return 0;

    //Formula: MaxPoints - (distance * (MaxPoints - MinPoints) / MaxDistance)

    const points = 15 - (distanceMeters * (14 / 50));
    return Math.max(0, Math.round(points));
  }

  setTotalScore(score: number): void {
    this.totalScore.set(score);
    localStorage.setItem('lastScore', score.toString());
  }
  resetScore(): void {
    this.totalScore.set(0);
  }


}
