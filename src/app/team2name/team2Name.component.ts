import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { TtsService } from '../services/textToSpeech.service';

@Component({
  selector: 'app-team2',
  standalone: true,
  template: `
    <div
      class="flex flex-wrap justify-center text-center gap-6 items-center mx-auto"
    >
      <h2 class="w-full font-semibold text-4xl text-neutral-800">
        Team 2 name?
      </h2>
      <input
        class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
        placeholder="Team 2..."
        #nameInput
      />
      <button
        class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95"
        (click)="setName(nameInput.value)"
      >
        Next
      </button>
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
