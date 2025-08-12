import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizService {
  activeTeam = signal<0 | 1 | 2>(0);
  team1Name = signal('Team 1');
  team2Name = signal('Team 2');
  team1Score = signal(0);
  team2Score = signal(0);
  currentQuestionIndex = signal(0);

  // round 1, 2, 3
  roundStage = signal<1 | 2 | 3>(1);
  // base, bonus, solid
  roundQuestionLevel = signal<1 | 2 | 3>(1);

  setTeam1Name(name: string) {
    this.team1Name.set(name);
  }

  setTeam2Name(name: string) {
    this.team2Name.set(name);
  }

  resetActiveTeam() {
    this.activeTeam.set(0);
  }

  getTeamName(team: 1 | 2 | 0) {
    return team === 1 ? this.team1Name() : this.team2Name();
  }

  addPoints(team: 0 | 1 | 2, points: number) {
    if (team === 1) {
      this.team1Score.update((score) => score + points);
    } else {
      this.team2Score.update((score) => score + points);
    }
  }

  nextQuestion() {
    this.currentQuestionIndex.update((i) => i + 1);
  }

  iterateRound() {
    this.roundQuestionLevel.set(1);
    if (this.roundStage() === 3) {
      this.roundStage.set(1);
    } else {
      this.roundStage.set((this.roundStage() + 1) as 1 | 2 | 3);
    }
  }

  iterateQuestionLevel() {
    this.roundQuestionLevel.set((this.roundQuestionLevel() + 1) as 1 | 2 | 3);
  }
}
