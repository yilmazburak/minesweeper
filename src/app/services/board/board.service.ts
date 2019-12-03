import { Cell } from "../cell/cell.service";
import { Injectable } from '@angular/core';

const PEERS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export interface BoardOptions {
  size?: number;
  mines?: number;
};


@Injectable({
  providedIn: 'root',
})
export class Board {
    private defaultOptions: BoardOptions = {
      size: 15,
      mines: 50,
    };

    cells: Cell[][] = [];

    private remainingCells = 0;
    private mineCount = 0;
    constructor(){
      this.refresh();
    }

    refresh(options?: BoardOptions) {
      const size = options ? options.size || this.defaultOptions.size : this.defaultOptions.size;
      const mines = options ? options.mines || this.defaultOptions.mines: this.defaultOptions.mines;;
        for (let y = 0; y < size; y++) {
            this.cells[y] = [];
            for (let x = 0; x < size; x++) {
                this.cells[y][x] = new Cell(y, x);
            }
        }

        // Assign Mines
        for (let i = 0; i < mines; i++) {
            this.getRandomCell().mine = true;
        }

        // Count Mines
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                let adjacentMines = 0;
                for (const peer of PEERS) {
                    if(this.cells[y+peer[0]] && this.cells[y+peer[0]][x+peer[1]] && this.cells[y+peer[0]][x+peer[1]].mine) {
                        adjacentMines++;
                    }
                }
                this.cells[y][x].proximityMines = adjacentMines;

                if(this.cells[y][x].mine){
                    this.mineCount++;
                }
            }
        }
        this.remainingCells = (size * size) - this.mineCount;

    }

    getMineCount(): number {
      console.log("MineCount");
      return this.mineCount;
    }

    getRandomCell(): Cell {
        const y = Math.floor(Math.random() * this.cells.length);
        const x = Math.floor(Math.random() * this.cells[y].length);
        return this.cells[y][x];
    }

    checkCell(cell: Cell): 'gameover' | 'win' | null {
        if(cell.status !== "open") {
            return;
        } else if(cell.mine) {
            this.revealAll();
            return 'gameover';
        } else {
            cell.status = 'clear';
            //Empty celli let's clear the whole block.
            if(cell.proximityMines === 0) {
                for(const peer of PEERS) {
                    if(this.cells[cell.row + peer[0]] && this.cells[cell.row + peer[0]][cell.column + peer[1]]) {
                        this.checkCell(this.cells[cell.row + peer[0]][cell.column + peer[1]]);
                    }
                }
            }
            if(this.remainingCells-- <= 1) {
                return 'win';
            };
            return;
        }
    }

    revealAll(){
        for (const row of this.cells) {
            for (const cell of row) {
                if(cell.status === 'open') {
                    cell.status = 'clear';
                }
            }
        }
    }
  
}