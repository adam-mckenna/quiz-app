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
      this.quizService.activeTeam(),
      map[this.quizService.roundQuestionLevel()],
    );

    if (this.quizService.roundQuestionLevel() !== 3) {
      this.quizService.iterateQuestionLevel();
    } else {
      this.quizService.iterateRound();
    }

    const hasFinishedRound =
      this.quizService.roundQuestionLevel() === 1 &&
      this.quizService.roundStage() === 1;
    if (hasFinishedRound) {
      this.router.navigate(['/question']);
    }
  }

  handleIncorrectAnswer() {
    this.quizService.iterateRound();

    const hasFinishedRound = this.quizService.roundStage() === 1;
    if (hasFinishedRound) {
      this.router.navigate(['/question']);
    }
  }
}
