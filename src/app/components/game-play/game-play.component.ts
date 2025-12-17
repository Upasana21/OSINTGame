import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-game-play',
  imports: [ReactiveFormsModule, MapComponent],
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
    console.log('submitted', this.gameForm.value, this.gameForm);
    this.guessLat = this.gameForm?.get('latitude')?.value;
    this.guessLng = this.gameForm?.get('longitude')?.value;
    console.log('tt', this.guessLat, this.guessLng,)
    // this.gameForm.reset();
  }

}
