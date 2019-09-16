import {UP_KEY, DOWN_KEY} from '../Constants.js'

class Control {
     static _instance = new Control();

     static instance() {
         return this._instance;
     }

     move(square) {
        this.tryGoUp(square);
        this.tryGoDown(square);
     }

     tryGoUp(square) {
        if (square.canGoUp()) {
            this.goUp(square);
        }
     }

     goUp(square) {
        square.goUp();
     }

     tryGoDown(square) {
        if (square.canGoDown()) {
            this.goDown(square);
        }
     }

     goDown(square) {
         square.goDown();
     }
}

export default Control;