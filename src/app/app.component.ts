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

  getBoard(){
    return this.board;
  }

  checkCell(cell: Cell) {
    if(!this.board.win && !this.board.lose){
      const result = this.board.checkCell(cell);
      this.timer.startClick();
  
  
      if(result === 'gameover') {
        this.board.lose = true;
        this.timer.pauseClick();
        // alert('You Lose!');
      } else if (result === 'win'){
        this.board.win = true;
        this.board.revealFlags();
        this.board.setFlagCount(this.board.getMineCount());
        this.timer.pauseClick();
        // alert('You Win!');
  
      }
    }
    
  }

  flag(cell: Cell) {
    if(!this.board.win && !this.board.lose){
      if(cell.status === 'flag') {
        this.board.setFlagCount(this.board.getFlagCount()-1);
        cell.status = 'close';

      }else if(cell.status === 'close') {
        this.board.setFlagCount(this.board.getFlagCount()+1);
        cell.status = 'flag';
      }
    }
  }

  reset(){
    this.board.refresh();
  }

}
