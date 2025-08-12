import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bonus-round',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Bonus Round</h2>

    <form [formGroup]="scoreForm" (ngSubmit)="handleFormSubmit()">
      <div>
        <label for="team_1_score">Team 1 Score:</label>
        <input
          type="number"
          id="team_1_score"
          formControlName="team_1_score"
          min="0"
          step="5"
        />
      </div>

      <div>
        <label for="team_2_score">Team 2 Score:</label>
        <input
          type="number"
          id="team_2_score"
          formControlName="team_2_score"
          min="0"
          step="5"
        />
      </div>

      <button type="submit">Submit Scores</button>
    </form>
  `,
})
export class BonusRoundComponent {
  scoreForm: any;

  constructor(
    public quizService: QuizService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    if (
      this.quizService.roundTally()! % 3 ||
      this.quizService.roundTally() == 0
    ) {
      this.router.navigate(['/question']);
    }
    this.scoreForm = this.formBuilder.group({
      team_1_score: [0],
      team_2_score: [0],
    });
  }

  handleFormSubmit(): void {
    if (this.scoreForm.valid) {
      const { team_1_score, team_2_score } = this.scoreForm.value;
      this.quizService.team1Score.set(
        this.quizService.team1Score() + team_1_score,
      );
      this.quizService.team2Score.set(
        this.quizService.team2Score() + team_2_score,
      );
      this.router.navigate(['/question']);
    }
  }
}
