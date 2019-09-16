class Cell {
    constructor(offX, offY, width) {
        this.offX = offX;
        this.offY = offY;
        this.width = width;
        this.isUsed = false;
    }

    static create(offX, offY, width) {
        return new Cell(offX, offY, width);
    }

    getFullOffX() {
        return this.offX * this.width;
    }

    getFullOffY() {
        return this.offY * this.width;
    }
}

export default Cell;