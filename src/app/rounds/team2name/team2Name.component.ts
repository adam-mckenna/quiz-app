import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { QuizService } from '../../services/quiz.service';
import { TextToSpeechService } from '../../services/textToSpeech.service';

@Component({
  selector: 'name-team-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="flex flex-wrap justify-center text-center gap-6 items-center mx-auto"
    >
      <h1 class="w-full font-semibold text-4xl text-neutral-800">
        Team 2 name?
      </h1>
      <form [formGroup]="teamForm" (ngSubmit)="onSubmit()" class="w-full">
        <input
          formControlName="teamName"
          class="w-full mb-4 bg-neutral-100 text-xl border border-neutral-200 rounded p-4 placeholder:text-neutral-400"
          placeholder="Team 2..."
        />
        <button
          type="submit"
          [disabled]="!teamForm.valid"
          class="cursor-pointer py-4 px-12 text-xl rounded bg-green-600 border-b-2 border-green-700 text-white uppercase font-bold transition-all hover:bg-green-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </form>
    </div>
  `,
})
export class Team2Component {
  teamForm: FormGroup;

  constructor(
    private quizService: QuizService,
    private textToSpeechService: TextToSpeechService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.teamForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const teamName = this.teamForm.get('teamName')?.value;
      this.setName(teamName);
    }
  }

  setName(name: string) {
    this.quizService.setTeam2Name(name);

    this.textToSpeechService.speak(name).subscribe((res: any) => {
      const audioContent = res.audioContent;
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audio.play();
      setTimeout(() => {
        this.router.navigate(['/question']);
      }, 1000);
    });
  }
}
