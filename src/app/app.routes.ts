import { Routes } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { levelGuard } from './guards/level.guard';

export const routes: Routes = [
    { path: '', component: GamesComponent },
    { path: 'gamePlay/:id', component: GamePlayComponent, canActivate: [levelGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
