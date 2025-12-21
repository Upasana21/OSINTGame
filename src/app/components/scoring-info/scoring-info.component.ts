import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogContent } from "@angular/material/dialog";

@Component({
  selector: 'app-scoring-info',
  imports: [MatTableModule, MatDialogContent],
  templateUrl: './scoring-info.component.html',
  styleUrl: './scoring-info.component.css'
})
export class ScoringInfoComponent {
  displayedColumns: string[] = ['distance', 'points', 'logic'];
  dataSource = [
    { distance: '0m', points: 15, logic: 'Exact Match' },
    { distance: '10m', points: 12, logic: 'Very close' },
    { distance: '25m', points: 8, logic: 'Mid-range' },
    { distance: '50m', points: 1, logic: 'Minimum points' },
    { distance: '>50m', points: 0, logic: 'Outside range' }
  ];
}
