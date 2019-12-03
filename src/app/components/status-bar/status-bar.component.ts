import { Component, OnInit } from '@angular/core';
import { Board } from '../../services/board/board.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})

export class StatusBarComponent implements OnInit {

  constructor(private board: Board) {
  }

  ngOnInit() {
  }

  reset(){
    this.board.refresh();
  }

  

}
