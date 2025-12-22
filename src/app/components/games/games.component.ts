import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInputComponent } from '../../shared/components/user-input/user-input.component';
import { CommonService } from '../../services/common.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  constructor(private dialog: MatDialog, public commonService: CommonService, public scoreService: ScoreService) { }
  // to store data from localstorage+db
  name: any = localStorage.getItem('name');
  score: number = Number(localStorage.getItem('lastScore'));

  onStartGameClick(): void {
    this.dialog.open(UserInputComponent, {
      width: "600px",
      disableClose: false
    })
    localStorage.removeItem('activeLevel');
    localStorage.setItem('lastScore', '0');
    this.scoreService.totalScore.set(0);
  }
}

