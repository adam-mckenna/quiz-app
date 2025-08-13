import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bonus-round',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="grid text-center gap-6">
      <h2 class="w-full font-semibold text-4xl text-neutral-800">
        Bonus Round
      </h2>

      <form [formGroup]="scoreForm" (ngSubmit)="handleFormSubmit()">
        <div class="grid gap-1 text-left">
          <label for="team_1_score" class="font-medium text-neutral-800"
            >Team 1 scored...</label
          >
          <input
            type="number"
            id="team_1_score"
            formControlName="team_1_score"
            min="0"
            step="5"
            class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
          />
        </div>

        <div class="grid gap-1 text-left">
          <label for="team_2_score" class="font-medium text-neutral-800"
            >Team 2 scored...</label
          >
          <input
            type="number"
            id="team_2_score"
            formControlName="team_2_score"
            min="0"
            step="5"
            class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
          />
        </div>

        <button
          class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95"
          type="submit"
        >
          Submit Scores
        </button>
      </form>
    </section>
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
