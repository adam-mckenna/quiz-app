import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'bonus-round',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="grid text-center gap-6">
      <h1 class="w-full font-semibold text-4xl text-neutral-800">
        Bonus Round
      </h1>

      <form [formGroup]="scoreForm" (ngSubmit)="handleFormSubmit()">
        <div class="grid gap-1 text-left">
          <label for="team1Score" class="font-medium text-neutral-800"
            >Team 1 scored...</label
          >
          <input
            type="number"
            id="team1Score"
            formControlName="team1Score"
            min="0"
            step="5"
            class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
          />
        </div>

        <div class="grid gap-1 text-left">
          <label for="team2Score" class="font-medium text-neutral-800"
            >Team 2 scored...</label
          >
          <input
            type="number"
            id="team2Score"
            formControlName="team2Score"
            min="0"
            step="5"
            class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
          />
        </div>

        <button
          class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          [disabled]="!scoreForm.valid"
        >
          Submit Scores
        </button>
      </form>
    </div>
  `,
})
export class BonusRoundComponent {
  scoreForm: FormGroup;

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
      team1Score: [0, [Validators.required]],
      team2Score: [0, [Validators.required]],
    });
  }

  handleFormSubmit(): void {
    if (this.scoreForm.valid) {
      const { team1Score, team2Score } = this.scoreForm.value;
      this.quizService.team1Score.set(
        this.quizService.team1Score() + team1Score,
      );
      this.quizService.team2Score.set(
        this.quizService.team2Score() + team2Score,
      );
      this.router.navigate(['/question']);
    }
  }
}
