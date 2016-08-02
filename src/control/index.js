const Eventable = require('../eventable/index');

class Control extends Eventable {
    constructor() {
        super();

        window.addEventListener('keydown', (e) => {
            switch (e.which) {
                case 38:
                    this._emit({x: 0, y: -1});
                    break;
                case 40:
                    this._emit({x: 0, y: 1});
                    break;
                case 37:
                    this._emit({x: -1, y: 0});
                    break;
                case 39:
                    this._emit({x: 1, y: 0});
                    break;

                case 97:
                    this._emit({x: -1, y: 1});
                    break;
                case 98:
                    this._emit({x: 0, y: 1});
                    break;
                case 99:
                    this._emit({x: 1, y: 1});
                    break;

                case 100:
                    this._emit({x: -1, y: 0});
                    break;
                case 101:
                    this._emit({x: 0, y: 0});
                    break;
                case 102:
                    this._emit({x: 1, y: 0});
                    break;

                case 103:
                    this._emit({x: -1, y: -1});
                    break;
                case 104:
                    this._emit({x: 0, y: -1});
                    break;
                case 105:
                    this._emit({x: 1, y: -1});
                    break;
            }
        });
    }
}

module.exports = new Control();
