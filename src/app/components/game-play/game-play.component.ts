import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapComponent } from "../map/map.component";
import { InputComponent } from "../../shared/components/input/input.component";
import { GameModel } from '../../models/game.model';
import { LOCATIONS } from '../../constants/location.constants';
import { DistanceService } from '../../services/distance.service';
import { ScoreService } from '../../services/score.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SummaryComponent } from '../summary/summary.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-game-play',
  imports: [CommonModule, ReactiveFormsModule, MapComponent, InputComponent],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.css'
})
export class GamePlayComponent implements OnInit {
  constructor(private fb: FormBuilder, private distanceService: DistanceService,
    private scoreService: ScoreService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  gameForm!: FormGroup;
  isSubmitted: boolean = false;
  showNextButton = false;
  id: number = 0;
  finalResult: GameModel[] = []
  guessLat: number = 0;
  guessLng: number = 0;
  actualLat: number = 0;
  actualLng: number = 0;
  guessCount: number = 0;
  gameLevels: any = LOCATIONS;
  currentIndex: number = 0;
  data: GameModel = {
    imageId: 0,
    playerName: '',
    guessLatitude: 0,
    guessLongitude: 0,
    date: new Date(),
    score: 0,
    guessCount: 0,
    distanceInMeters: 0
  }
  gameHistory: GameModel[] = [];


  ngOnInit(): void {
    this.createForm();
    this.getRouteId();
  }

  createForm(): FormGroup {
    return this.gameForm = this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    })
  }

  getRouteId(): void {
    this.route.paramMap.subscribe(params => {
      // this.id = +params['id'] //!removes null value
      this.id = +params.get('id')!;

    })
  }

  onFormSubmit(): void {
    this.isSubmitted = true;

    if (this.gameForm.valid) {
      this.guessCount++;
      this.showNextButton = true;

      this.guessLat = +this.gameForm?.get('latitude')?.value;
      this.guessLng = +this.gameForm?.get('longitude')?.value;
      this.actualLat = this.gameLevels[this.id - 1]?.latitude;
      this.actualLng = this.gameLevels[this.id - 1]?.longitude;

      const distance = this.distanceService.calculateDistance(this.guessLat, this.guessLng, this.actualLat, this.actualLng)
      const points = this.scoreService.calculateScore(distance)

      this.data = {
        playerName: 'Andy',
        imageId: this.gameLevels[this.id - 1]?.id,
        guessLatitude: this.guessLat,
        guessLongitude: this.guessLng,
        date: new Date(),
        score: points,
        guessCount: this.guessCount,
        distanceInMeters: distance
      }
      this.gameHistory.push(this.data)
      this.gameForm.reset();

      // console.log(this.gameHistory);

      const res = this.gameHistory.reduce<Record<number, GameModel>>(
        (acc, current) => {
          acc[current.imageId] = current;
          return acc;
        },
        {}
      );

      this.finalResult = Object.values(res); //player data for 3 levels
      console.log('fiinal', this.finalResult)
      //show incorrect answeres
      if (distance > 50) {
        this.openSnackBar()
      } else {
        this.openMap();
      }

    } else {
      this.gameForm.markAllAsTouched();
    }
  }

  nextStep(): void {
    const currentIndex = this.gameLevels.findIndex((level: any) => level.id === this.id);
    if (currentIndex !== -1 && currentIndex < this.gameLevels.length - 1) {
      // this.currentIndex++;
      this.id = this.gameLevels[currentIndex + 1].id;
      this.showNextButton = false;
      this.isSubmitted = false;
      this.guessCount = 0;
      this.gameForm.reset();
      this.gameForm.markAsUntouched();
      this.gameForm.markAsPristine();
      //storing level data so that user can't navigate back & forth
      localStorage.setItem('activeLevel', this.id.toString())
      this.router.navigate(['/gamePlay', this.id]);

    } else {
      //finish clicked
      localStorage.clear();
      const finalScore = this.finalResult.reduce((acc, cur) => {
        acc += cur.score;
        return acc;
      }, 0)

      this.scoreService.setTotalScore(finalScore);
      this.dialog.open(SummaryComponent, {
        width: '600px',
        disableClose: true,
        data: { data: this.finalResult }
      })
      this.router.navigate(['']);
    }
  }

  openSnackBar() {
    this.snackBar.open('Incorrect! Distance is too far.', 'Close', {
      duration: 1200,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['full-width-top-error']
    });
  }

  openMap() {
    this.dialog.open(MapComponent, {
      data: { guessLat: this.guessLat, guessLng: this.guessLng, actualLat: this.actualLat, actualLng: this.actualLng }
    })
  }

}
