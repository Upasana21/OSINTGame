import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-user-input',
  imports: [MatDialogModule, FormsModule, MatIcon],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  playerName: string = ''
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<UserInputComponent>);
  public commonService = inject(CommonService);

  startGame(): void {
    if (this.playerName)
      this.router.navigate(['/gamePlay', 1]);
    this.dialogRef.close();
    this.commonService.setPlayerName(this.playerName)
  }

}
