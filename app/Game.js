import IndexInspector from './utils/IndexInspector.js';
import SquareBuider from './models/builders/SquareBuilder.js';
import FieldBuilder from './models/builders/FieldBuilder.js';
import BarrierBuilder from './models/builders/BarrierBuilder.js';
import {SPEED_MS} from './Constants.js';
import Control from './models/Control.js';
import CrashError from './models/errors/CrashError.js';
import BarrierBorderError from './models/errors/BarrierBorderError.js';

class Game {

    constructor() {
        this.field = FieldBuilder.instance().field;
        this.square = SquareBuider.instance().create();
        this.control = Control.instance();
        this.newBarrier();
        this.controlCircleInterval = null;
        this.barriersCircleInterval = null;
    }

    static get() {
        return new Game();
    }

    start() {
        console.log('It was started');

        this.barriersCircle();
        this.controlCircle();
    }

    newBarrier() {
        this.barrier = BarrierBuilder.instance().createRandom();
    }

    barriersCircle() {
        this.barriersCircleInterval = setInterval(this.barrierCallback.bind(this), SPEED_MS * 1.5);
    }

    barrierCallback() {
        try {
            this.barrier.move();
        } catch(e) {
            this.handleCrash(e);
            this.handleBarrierOutOfScope(e);
        }
    }

    handleCrash(e) {
        if (!(e instanceof CrashError)) {
            return;
        }

        clearInterval(this.barriersCircleInterval);
        clearInterval(this.controlCircleInterval);
        console.log('Game over');
    }

    handleBarrierOutOfScope(e) {
        if (!(e instanceof BarrierBorderError)) {
            return;
        }

        this.barrier.finalize();
        this.newBarrier();
    }

    controlCircle() {
        this.controlCircleInterval = setInterval(this.controlCallback.bind(this), SPEED_MS);  
    }

    controlCallback() {
        try {
            this.control.move(this.square);
        } catch(e) {
            this.handleCrash(e);
        }
        
    }
}

export default Game;