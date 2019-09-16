import Cell from './../models/Cell.js'

class IndexInspetor {
    static _instance = new IndexInspetor();

    constructor() {
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext("2d");
    }

    static instance() {
        return this._instance;
    }

    getWidth() {
        return this.canvas.getAttribute('width');
    }

    getHeight() {
        return this.canvas.getAttribute('height');
    }

    fillCell(cell) {
        this.ctx.beginPath();
        this.ctx.rect(cell.getFullOffX(), cell.getFullOffY(), cell.width, cell.width);
        this.ctx.fill();
    }

    clearCell(cell) {
        this.ctx.clearRect(cell.getFullOffX(), cell.getFullOffY(), cell.width, cell.width);
    }

    registerKeydown(square) {
        document.addEventListener('keydown', square.onKeydownCallback.bind(square), false);
    }

    registerKeyup(square) {
        document.addEventListener('keyup', square.onKeyupCallback.bind(square), false);
    }
}

export default IndexInspetor;