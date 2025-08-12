import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'round',
  standalone: true,
  template: `
    <h2>Round</h2>

    <p>Question: {{ this.quizService.roundStage() }}</p>
    <p>Level: {{ this.quizService.roundQuestionLevel() }}</p>

    <p>
      Getting the points:
      {{
        this.isStealing
          ? this.quizService.getOpposingTeam()
          : this.quizService.activeTeam()
      }}
    </p>

    <button
      style="background: green; color: white"
      (click)="this.handleCorrectAnswer()"
    >
      Correct
    </button>
    <button
      style="background: green; color: white"
      (click)="this.handleIncorrectAnswer()"
    >
      Incorrect
    </button>
  `,
})
export class RoundComponent {
  isStealing = false;

  constructor(
    public quizService: QuizService,
    private router: Router,
  ) {}

  handleCorrectAnswer() {
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
