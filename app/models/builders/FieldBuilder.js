import IndexInspector from '../../utils/IndexInspector.js'
import Field from '../Field.js'

class FieldBuilder {
    static _instance = new FieldBuilder();

    _field = null;
    indexInspector = IndexInspector.instance();

    static instance() {
        return this._instance;
    }

    get field() {
        if (this._field) {
            return this._field;
        }

        let width = IndexInspector.instance().getWidth();
        let height = IndexInspector.instance().getHeight();
        this._field = Field.create(width, height);

        return this._field;
    }
}

export default FieldBuilder;