import { Component } from '@angular/core';
import { Board } from './services/board/board.service';
import { Cell } from './services/cell/cell.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'minesweeper';

  constructor(private board: Board) {
      console.log(board);
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
    this.board.refresh();
  }

}
