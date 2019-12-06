
import { interval, Subject, PartialObserver, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  name = "Angular";
  private progressNum = 0;
  progress: string;
  second: number;
  isRunning = true;
  isComplete = false;

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;

  stopClick$ = new Subject();
  pauseClick$ = new Subject();

  

  private getProgress() {
    this.progress = `${this.progressNum}%`;
    this.second = this.progressNum;
  }
  start() {
    this.getProgress();

    this.timer$ = interval(1000)
      .pipe(
        takeUntil(this.pauseClick$),
        takeUntil(this.stopClick$)
      );

    this.timerObserver = {
      next: (_: number) => {
        if (this.progressNum < 999) {
          this.progressNum += 1;
          this.getProgress();
        } else {
          this.stopClick$.next();
          this.isRunning = false;
          this.isComplete = true;
        }
      }
    };

    this.timer$.subscribe(this.timerObserver);
  }

  pauseClick() {
    this.pauseClick$.next();
    this.isRunning = false;
  }

  restartClick() {
    this.isRunning = true;
    if (this.isComplete) {
      this.isComplete = false;
      this.progressNum = 0;
      this.getProgress();
    }

    this.timer$.subscribe(this.timerObserver);
  }

  stopClick() {
    this.progressNum = 0;
    this.getProgress();
    this.stopClick$.next();
    this.isRunning = false;
  }
}