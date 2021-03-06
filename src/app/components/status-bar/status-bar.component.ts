import { Component, OnInit } from '@angular/core';
import { Board } from '../../services/board/board.service';
import { Timer } from '../../services/timer/timer.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})

export class StatusBarComponent implements OnInit {

  constructor(private board: Board, private timer: Timer) {
    console.log(timer);
  }

  ngOnInit() {
  }

  getBoard(){
    return this.board;
  }

  getTimer(){
    return this.timer;
  }

  reset(){
    this.board.refresh();
    this.timer.stopClick();
  }
  

}
