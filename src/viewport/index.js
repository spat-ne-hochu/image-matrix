const Eventable = require('../eventable/index');

class Viewport extends Eventable {
    constructor() {
        super();

        this.isOverflow = true;
        this.ms         = 40;

        window.addEventListener('resize', () => {
            this._emit(this.getCurrent());
        });
    }

    getCurrent() {
        let vw = document.documentElement.clientWidth,
            vh = document.documentElement.clientHeight;

        return {
            vw: vw,
            vh: vh,
            half: {
                vw: ~~(vw / 2),
                vh: ~~(vh / 2)
            }
        }
    }
}

module.exports = new Viewport();

