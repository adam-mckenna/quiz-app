import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team1',
  standalone: true,
  template: `
    <h2>Enter Team 1 Name</h2>
    <input #nameInput />
    <button (click)="setName(nameInput.value)">Next</button>
  `,
})
export class Team1Component {
  constructor(
    private quizService: QuizService,
    private router: Router,
  ) {}

  setName(name: string) {
    this.quizService.setTeam1Name(name);
    this.router.navigate(['/name-team-2']);
  }
}
