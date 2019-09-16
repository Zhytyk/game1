
class RandomUtils {
    static _instance = new RandomUtils();

    static instance() {
        return this._instance;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default RandomUtils;