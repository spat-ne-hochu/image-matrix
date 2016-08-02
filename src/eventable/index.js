class Eventable {
    constructor() {
        this._listeners = [];
        this._timeout   = null;
        this._wait      = false;
        this._overflow  = null;
        this.ms         = 333;
        this.isOverflow = false;
    }

    _emit(data) {
        if (! this._wait) {
            this._wait = true;

            if (this._timeout) {
                clearTimeout(this._timeout);
            }

            this._timeout = setTimeout(() => {
                this._wait = false;

                if (this._overflow) {
                    this._emit(this._overflow);
                    this._overflow = null;
                }
            }, this.ms);

            for (let listener of this._listeners) {
                listener(data);
            }
        } else {
            if (this.isOverflow) {
                this._overflow = data;
            }
        }
    }

    addListener(listener) {
        this._listeners.push(listener)
    }
}

module.exports = Eventable;

