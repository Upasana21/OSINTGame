import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapComponent } from "../map/map.component";
import { InputComponent } from "../../shared/components/input/input.component";
import { GameModel } from '../../models/game.model';
import { LOCATIONS } from '../../constants/location.constants';
import { DistanceService } from '../../services/distance.service';
import { ScoreService } from '../../services/score.service';


@Component({
  selector: 'app-game-play',
  imports: [CommonModule, ReactiveFormsModule, MapComponent, InputComponent],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.css'
})
export class GamePlayComponent implements OnInit {
  constructor(private fb: FormBuilder, private distanceService: DistanceService,
    private scoreService: ScoreService
  ) { }

  gameForm!: FormGroup;
  isSubmitted: boolean = false;

  // guessLat: number = 0;
  // guessLng: number = 0;
  // actualLat = -33.851870;
  // actualLng = 151.190186;
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
  }

  createForm(): FormGroup {
    return this.gameForm = this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    })
  }

  onFormSubmit(): void {
    this.isSubmitted = true;

    if (this.gameForm.valid) {
      this.guessCount++;

      const guessLat = this.gameForm?.get('latitude')?.value;
      const guessLng = this.gameForm?.get('longitude')?.value;
      const actualLat = this.gameLevels[this.currentIndex].latitude;
      const actualLng = this.gameLevels[this.currentIndex].longitude;

      const distance = this.distanceService.calculateDistance(guessLat, guessLng, actualLat, actualLng)
      const points = this.scoreService.calculateScore(distance)
      this.data = {
        playerName: 'Andy',
        imageId: this.gameLevels[this.currentIndex].id,
        guessLatitude: guessLat,
        guessLongitude: guessLng,
        date: new Date(),
        score: points,
        guessCount: this.guessCount,
        distanceInMeters: distance
      }
      this.gameHistory.push(this.data)
      this.gameForm.reset();

      console.log(this.gameHistory);

      const res = this.gameHistory.reduce<Record<number, GameModel>>(
        (acc, current) => {
          acc[current.imageId] = current;
          return acc;
        },
        {}
      );

      const values = Object.values(res);
      console.log('fiinal', values)

    } else {
      this.gameForm.markAllAsTouched();
    }
  }

  nextStep(): void {
    if (this.currentIndex < this.gameLevels.length - 1 && this.isSubmitted) {
      this.currentIndex++;
      this.isSubmitted = false;
      this.guessCount = 0;
      this.gameForm.reset();
    } else {
      console.log('Game Over!!!')
    }
  }


}
