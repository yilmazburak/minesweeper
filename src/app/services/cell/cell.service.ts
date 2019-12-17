export class Cell{
    status: 'close' | 'clear' | 'flag' = 'close';
    mine = false;
    proximityMines = 0;

    constructor(public row: number, public column: number) {

    }
}