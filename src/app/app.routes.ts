import { Routes } from '@angular/router';

import { Team1Component } from './rounds/team1name/team1Name.component';
import { Team2Component } from './rounds/team2name/team2Name.component';
import { PreroundQuestionComponent } from './rounds/preround-question/preround-question.component';
import { BasicRoundComponent } from './rounds/basic-round/basic-round.component';
import { BonusRoundComponent } from './rounds/bonus-round/bonus-round.component';

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
    component: PreroundQuestionComponent,
  },
  {
    path: 'round',
    component: BasicRoundComponent,
  },
  {
    path: 'bonus-round',
    component: BonusRoundComponent,
  },
];
