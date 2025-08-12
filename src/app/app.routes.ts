import { Routes } from '@angular/router';
import { Team1Component } from './team1name/team1Name.component';
import { Team2Component } from './team2name/team2Name.component';
import { QuestionComponent } from './question/question.component';
import { RoundComponent } from './round/round.component';
import { BonusRoundComponent } from './bonus-round/round.component';

export const routes: Routes = [
  {
    path: '',
    component: Team1Component,
  },
  {
    path: 'name-team-2',
    component: Team2Component,
  },
  {
    path: 'question',
    component: QuestionComponent,
  },
  {
    path: 'round',
    component: RoundComponent,
  },
  {
    path: 'bonus-round',
    component: BonusRoundComponent,
  },
];
