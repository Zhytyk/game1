import IndexInspector from '../../utils/IndexInspector.js'
import FieldBuilder from './FieldBuilder.js'
import Square from '../Square.js'

class SquareBuilder {
    static _instance = new SquareBuilder();
    
    indexInspector = IndexInspector.instance();

    static instance() {
        return this._instance;
    }

    create() {
        let square = Square.create(FieldBuilder.instance().field);
        this.indexInspector.registerKeydown(square);
        this.indexInspector.registerKeyup(square);

        return square;
    }
}

export default SquareBuilder;