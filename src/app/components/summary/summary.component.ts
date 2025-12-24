import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DistanceService } from '../../services/distance.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ScoringInfoComponent } from '../scoring-info/scoring-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-summary',
  imports: [MatDialogModule, MatIconModule, MatTooltipModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  private router = inject(Router);
  public distanceService = inject(DistanceService)
  private dialogRef = inject(MatDialogRef<SummaryComponent>);
  private dialog = inject(MatDialog)

  public data = inject(MAT_DIALOG_DATA);

  close() {
    this.dialogRef.close();
  }

  openScoringInfo(): void {
    this.dialog.open(ScoringInfoComponent, {
      panelClass: 'score-dialog-list',
      hasBackdrop: true, //outside click to close
      backdropClass: 'transparent-backdrop',
    })
  }
  restartGame(): void {
    this.router.navigate(['/gamePlay', 1]);
    this.close();
  }
}
