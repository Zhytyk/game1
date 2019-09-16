import {UP_KEY, DOWN_KEY} from '../Constants.js';
import IndexInspector from '../utils/IndexInspector.js';
import CrashError from './errors/CrashError.js';

class Square {
    constructor(field) {
        this.field = field;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.initCells();
        this.draw();
    }

    static create(field) {
        return new Square(field);
    }

    initCells() {
        let field = this.field;
        let initHeight = field.getAverageHeight();
        this.cells = [
           [ field.cells[initHeight][1], field.cells[initHeight][2] ],
           [ field.cells[initHeight + 1][1], field.cells[initHeight + 1][2] ]
        ];

        this.execOnEachCell((cell) => {
            cell.isUsed = true;
        });
    }

    replaceCell(newCell, i, j) {
        this.cells[i][j] = newCell;
    }

    draw() {
        let inspector = IndexInspector.instance();
        this.execOnEachCell((cell) => inspector.fillCell(cell));
    }

    clear() {
        let inspector = IndexInspector.instance();
        this.execOnEachCell((cell) => inspector.clearCell(cell));
    }

    canGoUp() {
        if (!this.isMovingUp) {
            return false;
        }

        this.validateCrashUp();

        let result = true;
        this.execOnEachCell((cell) => {
            if (cell.offY === 0) {
                result = false;
            }
        });

        return result;
    }

    validateCrashUp() {
        for (let i = 0; i < this.cells[0].length; i++) {
            let curCell = this.cells[0][i];
            let topCell = this.field.getTopCell(curCell);
            if (curCell !== topCell && topCell.isUsed) {
                throw new CrashError('You are caught!!!');
            }
        }
    }

    validateCrashDown() {
        for (let i = 0; i < this.cells[0].length; i++) {
            let curCell = this.cells[1][i];
            let downCell = this.field.getBottomCell(curCell);
            if (curCell !== downCell && downCell.isUsed) {
                throw new CrashError('You are caught!!!');
            }
        }
    }

    canGoDown() {
        if (!this.isMovingDown) {
            return false;
        }

        this.validateCrashDown();

        let result = true;
        let height = this.field.getHeight() - 1;

        this.execOnEachCell((cell) => {
            if (cell.offY === height) {
                result = false;
            }
        });

        return result;
    }

    goUp() {
        this.clear();

        this.execOnEachCell((cell, i, j) => {
            let nextCell = this.field.getTopCell(cell);
            cell.isUsed = false;
            this.replaceCell(nextCell, i, j);
            nextCell.isUsed = true;
        });

        this.draw();
    }

    goDown() {
        this.clear();

        this.execOnEachCell((cell, i, j) => {
            let nextCell = this.field.getBottomCell(cell);
            cell.isUsed = false;
            this.replaceCell(nextCell, i, j);
            nextCell.isUsed = true;
        });

        this.draw();
    }

    execOnEachCell(func) {
        let cells = this.cells;

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                func(cells[i][j], i, j);
            }
        }
    }

    onKeydownCallback(event) {
        this.setEventType(event, true);
    }

    onKeyupCallback(event) {
        this.setEventType(event, false);
    }

    setEventType(event, value) {
        switch (event.key) {
            case UP_KEY:
                this.isMovingUp = value;
                break;
            case DOWN_KEY:
                this.isMovingDown = value;
                break;
        }
    }
}

export default Square;