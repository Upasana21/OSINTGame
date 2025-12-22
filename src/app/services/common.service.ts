import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { GameModel, ScoreModel } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public playerName = signal<string>('');

  constructor(private http: HttpClient) { }

  url = 'https://osintgamebackend-default-rtdb.firebaseio.com';

  saveGameHistory(data: GameModel[]): any {
    return this.http.post(`${this.url}/gameHistory.json`, data)
  }

  fetchGameHistory(): Observable<any> { //will use somewhere
    return this.http.get(`${this.url}/gameHistory.json`);
  }

  savePlayerTotalScore(data: ScoreModel): any {
    return this.http.post(`${this.url}/playerScore.json`, data)
  }

  getPlayerTotalScore(): Observable<any> {
    return this.http.get(`${this.url}/playerScore.json`);
  }

  setPlayerName(name: string): void {
    localStorage.setItem('name', name.toString());
    this.playerName.set(name);
  }

  saveFinalResult(data: GameModel[]): any {
    return this.http.post(`${this.url}/finalResult.json`, data);
  }

  // fetchFinalResult(): void {}
}
