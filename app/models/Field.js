import Cell from './Cell.js';
import {CELL_WIDTH} from './../Constants.js';

class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.initCells();
    }

    static create(width, height) {
        return new Field(width, height);
    }

    initCells() {
        this.cells = [];

        for (let i = 0; i < this.height / CELL_WIDTH; i++) {
            this.cells.push([]);

            for (let j = 0; j < this.width / CELL_WIDTH; j++) {
                this.cells[i].push(Cell.create(j, i, CELL_WIDTH));
            }
        }
    }

    getTopCell(cell) {
        let nextOffY = this.cells[cell.offY - 1];
        if (!nextOffY) {
            return cell;
        }

        return this.cells[cell.offY - 1][cell.offX];
    }

    getLeftCell(cell) {
        let nextOffX = this.cells[cell.offY][cell.offX - 1];
        if (!nextOffX) {
            return cell;
        }

        return this.cells[cell.offY][cell.offX - 1];
    }

    getBottomCell(cell) {
        let nextOffY = this.cells[cell.offY + 1];
        if (!nextOffY) {
            return cell;
        }

        return this.cells[cell.offY + 1][cell.offX];
    }

    getHeight() {
        return this.height / CELL_WIDTH;
    }

    getAverageHeight() {
        return Math.floor(this.getHeight() / 2);
    }

    getWidth() {
        return this.width / CELL_WIDTH;
    }
}

export default Field;