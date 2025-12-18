import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MapComponent } from "../map/map.component";
import { InputComponent } from "../../shared/components/input/input.component";
import { GameModel } from '../../models/game.model';


@Component({
  selector: 'app-game-play',
  imports: [ReactiveFormsModule, MapComponent, InputComponent],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.css'
})
export class GamePlayComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  gameForm!: FormGroup;
  isSubmitted: boolean = false;
  guessLat: number = 0;
  guessLng: number = 0;
  actualLat = -33.851870;
  actualLng = 151.190186;
  guessCount: number = 0;
  data: GameModel = {
    imageId: 0,
    playerName: '',
    guessLatitude: 0,
    guessLongitude: 0,
    date: new Date(),
    score: 0,
    guessCount: 0,
    distance: 0
  }

  // 46.5018939,7.697529
  //-33.851870, 151.190186

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
    this.guessLat = this.gameForm?.get('latitude')?.value;
    this.guessLng = this.gameForm?.get('longitude')?.value;

    if (this.gameForm.valid) {
      this.guessCount++;
      this.data = {
        playerName: 'Andy',
        imageId: 1,
        guessLatitude: this.guessLat,
        guessLongitude: this.guessLng,
        date: new Date(),
        score: 0,
        guessCount: this.guessCount,
        distance: 0
      }
    } else {
      this.gameForm.markAllAsTouched();
    }

    console.log('data', this.data)
  }

}
