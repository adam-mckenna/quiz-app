import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { TtsService } from '../services/textToSpeech.service';

@Component({
  selector: 'question',
  standalone: true,
  template: `
    <div
      class="flex flex-wrap text-center gap-2 mb-12 bg-white px-18 py-16 rounded border border-stone-400 shadow"
    >
      <p class="w-full text-neutral-500">
        Round {{ this.quizService.roundTally() + 1 }}
      </p>
      <h2 class="w-full font-semibold text-4xl text-neutral-800">Question</h2>
    </div>

    @if (this.quizService.activeTeam()) {
      <dialog
        open="true"
        class="flex items-center justify-center z-10 w-dvw h-dvh bg-neutral-800/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          class="p-8 bg-white grid justify-center text-center rounded shadow border border-neutral-100"
        >
          <p class="text-neutral-500">Team</p>
          <h3 class="text-2xl font-bold mb-6">
            {{
              this.quizService.getTeamName(this.quizService.activeTeam() || 1)
            }}
          </h3>

          <div class="flex gap-4">
            <button
              class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95"
              (click)="this.handleCorrectAnswer()"
            >
              Correct
            </button>
            <button
              class="cursor-pointer py-4 px-12 text-xl rounded bg-red-600 border-b-2 border-red-700 text-white uppercase font-bold transition-all hover:bg-red-700 active:scale-95"
              (click)="this.handleWrongAnswer()"
            >
              Incorrect
            </button>
            @if (!hasSwitched) {
              <button
                class="cursor-pointer py-4 px-12 text-xl rounded bg-red-600 border-b-2 border-red-700 text-white uppercase font-bold transition-all hover:bg-red-700 active:scale-95"
                (click)="this.handleWrongAnswer(true)"
              >
                Interrupt
              </button>
            }
          </div>
        </div>
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
    public tts: TtsService,
    private router: Router,
  ) {
    this.quizService.activeTeam.set(0);
  }

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
      this.tts.speak(this.quizService.getTeamName(1)).subscribe((res: any) => {
        const audioContent = res.audioContent;
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();
      });
    } else if (key === ' ') {
      this.quizService.activeTeam.set(2);
      this.tts.speak(this.quizService.getTeamName(2)).subscribe((res: any) => {
        const audioContent = res.audioContent;
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.play();
      });
    }
  }
}
