import { Routes } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { GamePlayComponent } from './components/game-play/game-play.component';

export const routes: Routes = [
    { path: '', component: GamesComponent },
    { path: 'gamePlay', component: GamePlayComponent }
];
