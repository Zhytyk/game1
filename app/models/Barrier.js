import IndexInspector from '../utils/IndexInspector.js';
import RandomUtils from '../utils/RandomUtils.js';
import CrashError from './errors/CrashError.js';
import BarrierBuilder from './builders/BarrierBuilder.js';
import BarrierBorderError from './errors/BarrierBorderError.js';


class Barrier {
    constructor(field, numberOfEmptyCells) {
        this.field = field;
        this.numberOfEmptyCells = numberOfEmptyCells;
        this.initCells();
    }

    static create(field, numberOfEmptyCells) {
        return new Barrier(field, numberOfEmptyCells);
    }

    initCells() {
        this.cells = [];
        let field = this.field;
        let width = field.getWidth() - 1;
        let height = field.getHeight();
        let numberOfEmptyCells = this.numberOfEmptyCells;

        let startGap = RandomUtils.instance().getRandomInt(0, height - numberOfEmptyCells);
        for (let i = 0; i < height; i++) {  
            if (i >= startGap && i <= startGap + numberOfEmptyCells) {
                continue;
            }

            let cell = field.cells[i][width];
            this.cells.push(cell);
            cell.isUsed = true;
        }
    }

    execOnEachCell(func) {
        let cells = this.cells;
        let length = cells.length;

        for (let i = 0; i < length; i++) {
            func(cells[i], i);
        }
    }

    clearState() {
        this.execOnEachCell(cell => cell.isUsed = false);
    }

    clear() {
        let inspector = IndexInspector.instance();
        this.execOnEachCell(cell => inspector.clearCell(cell));
    }

    draw() {
        let inspector = IndexInspector.instance();
        this.execOnEachCell(cell => inspector.fillCell(cell));
    }

    replaceCell(newCell, i, j) {
        this.cells[i] = newCell;
    }

    move() {
        this.validateMove();
        this.clear();
        this.execOnEachCell(this.moveCell.bind(this));
        this.draw();
    }

    moveCell(cell, i) {
        let nextCell = this.field.getLeftCell(cell);
        cell.isUsed = false;
        this.replaceCell(nextCell, i);
        nextCell.isUsed = true;
    }

    validateMove() {
        this.execOnEachCell(this.validateMoveCell.bind(this));
    }

    validateMoveCell(cell, i) {
        let nextCell = this.field.getLeftCell(cell);

        if (nextCell === cell) {
            throw new BarrierBorderError();
        }

        if (nextCell.isUsed === true) {
            throw new CrashError('You are caught!!!');
        }
    }

    finalize() {
        this.clearState();
        this.clear();
    }
}

export default Barrier;