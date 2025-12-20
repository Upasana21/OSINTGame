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
  onStartGameClick(): void {
    this.router.navigate(['/gamePlay', 1])
  }
}

