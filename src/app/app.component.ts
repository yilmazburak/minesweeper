import { Component } from '@angular/core';
import { Board } from './services/board/board.service';
import { Cell } from './services/cell/cell.service';
import { Timer } from './services/timer/timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'minesweeper';

  constructor(private board: Board, private timer: Timer) {
    this.timer.stopClick();
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    this.timer.startClick();


    if(result === 'gameover') {
      this.board.lose = true;
      this.timer.pauseClick();
      // alert('You Lose!');
    } else if (result === 'win'){
      this.board.win = true;
      this.timer.pauseClick();
      // alert('You Win!');

    }
  }

  flag(cell: Cell) {
    if(cell.status === 'flag') {
      this.board.setFlagCount(this.board.getFlagCount()-1);
      cell.status = 'open';

    }else if(cell.status === 'open') {
      this.board.setFlagCount(this.board.getFlagCount()+1);
      cell.status = 'flag';
    }
  }

  reset(){
    this.board.refresh();
  }

}
