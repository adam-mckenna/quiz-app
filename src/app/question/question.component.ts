import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'question',
  standalone: true,
  template: `
    <h2>Question</h2>

    @if (this.quizService.activeTeam()) {
      <dialog open="true">
        Team
        {{ this.quizService.getTeamName(this.quizService.activeTeam() || 1) }}

        <button
          style="background: green; color: white"
          (click)="this.handleCorrectAnswer()"
        >
          Correct
        </button>
        <button style="background: red" (click)="this.handleWrongAnswer()">
          Incorrect
        </button>
        @if (!hasSwitched) {
          <button
            style="background: red"
            (click)="this.handleWrongAnswer(true)"
          >
            Interrupt
          </button>
        }
      </dialog>
    }
  `,
  host: {
    '(window:keydown)': 'onKeyDown($event)',
  },
})
export class QuestionComponent {
  hasSwitched: boolean = false;

  constructor(
    public quizService: QuizService,
    private router: Router,
  ) {}

  handleCorrectAnswer() {
    if (!this.quizService.activeTeam()) return;
    this.quizService.addPoints(this.quizService.activeTeam(), 5);
    this.router.navigate(['/round']);
  }

  handleWrongAnswer(hasInterrupted?: boolean) {
    if (this.hasSwitched) {
      this.quizService.resetActiveTeam();
      this.hasSwitched = false;
      return;
    }
    if (hasInterrupted && this.quizService.activeTeam()) {
      this.quizService.addPoints(this.quizService.activeTeam(), -5);
    }
    this.switchActiveTeam();
  }

  switchActiveTeam() {
    if (!this.quizService.activeTeam()) return;
    this.quizService.activeTeam.set(this.quizService.activeTeam() == 1 ? 2 : 1);
    this.hasSwitched = true;
  }

  onKeyDown({ key }: KeyboardEvent) {
    if (this.quizService.activeTeam()) return;
    if (key === 'Enter') {
      this.quizService.activeTeam.set(1);
    } else if (key === ' ') {
      this.quizService.activeTeam.set(2);
      console.log('team 2');
    }
  }
}
