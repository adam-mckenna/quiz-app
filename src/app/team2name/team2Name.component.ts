import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { TtsService } from '../services/textToSpeech.service';

@Component({
  selector: 'app-team2',
  standalone: true,
  template: `
    <div
      class="flex flex-wrap justify-center text-center gap-4 items-center mx-auto"
    >
      <h2 class="w-full">Enter Team 2 Name</h2>
      <input class="w-full bg-red-50" #nameInput />
      <button (click)="setName(nameInput.value)">Next</button>
    </div>
  `,
})
export class Team2Component {
  constructor(
    private quizService: QuizService,
    private tts: TtsService,
    private router: Router,
  ) {}

  setName(name: string) {
    this.quizService.setTeam2Name(name);

    this.tts.speak(name).subscribe((res: any) => {
      const audioContent = res.audioContent;
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audio.play();
      setTimeout(() => {
        this.router.navigate(['/question']);
      }, 1000);
    });
  }
}
