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
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    if(result === 'gameover') {
      this.board.lose = true;
      // alert('You Lose!');
    } else if (result === 'win'){
      this.board.win = true;
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
