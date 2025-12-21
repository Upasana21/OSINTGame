import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  constructor(private router: Router) { }
  playerName: string = "Player";
  score: number = Number(localStorage.getItem('lastScore')) || 0;
  onStartGameClick(): void {
    this.router.navigate(['/gamePlay', 1])
  }
}

