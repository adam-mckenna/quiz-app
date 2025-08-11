import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team2',
  standalone: true,
  template: `
    <h2>Enter Team 2 Name</h2>
    <input #nameInput />
    <button (click)="setName(nameInput.value)">Next</button>
  `,
})
export class Team2Component {
  constructor(
    private quizService: QuizService,
    private router: Router,
  ) {}

  setName(name: string) {
    this.quizService.setTeam2Name(name);
    this.router.navigate(['/question']);
  }
}
