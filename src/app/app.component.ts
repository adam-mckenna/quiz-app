import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'university-challenge-copycat';

  constructor(public quizService: QuizService) {}

  player1Name: string = '';
  player2Name: string = '';

  setPlayer1Name(value: string) {
    this.player1Name = value;
  }

  setPlayer2Name(value: string) {
    this.player2Name = value;
  }
}
