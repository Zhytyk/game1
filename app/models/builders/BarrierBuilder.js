import FieldBuilder from './FieldBuilder.js';
import RandomUtils from '../../utils/RandomUtils.js';
import Barrier from '../Barrier.js';
import {MAX_BARRIER_EMPTY_CELLS} from '../../Constants.js';

class BarrierBuilder {
    static _instance = new BarrierBuilder();

    static instance() {
        return this._instance;
    }

    createRandom() {
        let numberOfEmptyCells = RandomUtils.instance().getRandomInt(2, MAX_BARRIER_EMPTY_CELLS);
        return Barrier.create(FieldBuilder.instance().field, numberOfEmptyCells);
    }
}

export default BarrierBuilder;