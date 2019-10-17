import { Component } from '@angular/core';
import { Board } from './game/board';
import { Cell } from './game/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minesweeper';
  board: Board;

  constructor() {
    this.reset();
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    if(result === 'gameover') {
      alert('You Lose!');
    } else if (result === 'win'){
      alert('You Win!');
    }
  }

  flag(cell: Cell) {
    if(cell.status === 'flag') {
      cell.status = 'open';
    }else if(cell.status === 'open') {
      cell.status = 'flag';
    }
  }

  reset(){
    this.board = new Board(20,50);
  }

}
