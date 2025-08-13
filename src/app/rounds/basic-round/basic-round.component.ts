import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'basic-round',
  standalone: true,
  template: `
    <div class="grid text-center">
      <h1 class="w-full font-semibold text-4xl text-neutral-800">
        Round {{ this.quizService.roundTally() + 1 }}
      </h1>

      <hr class="w-24 mx-auto border-t-2 my-6 border-neutral-300" />
      <p class="text-xl">
        Question:
        <span class="font-semibold">{{ this.quizService.roundStage() }}</span>
      </p>
      <p class="text-xl mb-8">
        Level:
        <span class="font-semibold">{{
          this.quizService.questionLevelLabel()
        }}</span>
      </p>

      <p class="text-neutral-500">Getting the points</p>
      <p class="text-2xl font-bold mb-6">
        {{
          this.quizService.getTeamName(
            this.isStealing
              ? this.quizService.getOpposingTeam()
              : this.quizService.activeTeam()
          )
        }}
      </p>

      <div class="flex gap-4">
        <button
          class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95"
          (click)="this.handleCorrectAnswer()"
        >
          Correct
        </button>
        <button
          class="cursor-pointer py-4 px-12 text-xl rounded bg-red-600 border-b-2 border-red-700 text-white uppercase font-bold transition-all hover:bg-red-700 active:scale-95"
          (click)="this.handleIncorrectAnswer()"
        >
          Incorrect
        </button>
      </div>
    </div>
  `,
})
export class BasicRoundComponent {
  isStealing = false;

  constructor(
    public quizService: QuizService,
    private router: Router,
  ) {}

  handleCorrectAnswer() {
    // 5 points for initial answer and bonus, 10 for solid
    const map = {
      1: 5,
      2: 5,
      3: 10,
    };

    this.quizService.addPoints(
      this.isStealing
        ? this.quizService.getOpposingTeam()
        : this.quizService.activeTeam(),
      map[this.quizService.roundQuestionLevel()],
    );

    if (this.quizService.roundQuestionLevel() !== 3) {
      this.quizService.iterateQuestionLevel();
    } else {
      this.quizService.iterateRound();
      this.isStealing = false;
    }

    const hasFinishedRound =
      this.quizService.roundQuestionLevel() === 1 &&
      this.quizService.roundStage() === 1;
    if (hasFinishedRound) {
      this.handleHasFinishedRound();
    }
  }

  handleIncorrectAnswer() {
    if (this.isStealing) {
      this.isStealing = false;
      this.quizService.iterateRound();

      const hasFinishedRound = this.quizService.roundStage() === 1;
      if (hasFinishedRound) {
        this.handleHasFinishedRound();
      }
    } else {
      this.isStealing = true;
    }
  }

  handleHasFinishedRound() {
    this.quizService.roundTally.set(this.quizService.roundTally() + 1);
    console.log(this.quizService.roundTally());
    if (this.quizService.roundTally() % 3 === 0) {
      this.router.navigate(['/bonus-round']);
    } else {
      this.router.navigate(['/question']);
    }
  }
}
