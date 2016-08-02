const
    {
        rootElement : root,
        cell : {
            height : cellH,
            width  : cellW
        },
        matrixSize : {
            height : cY,
            width  : cX
        }
    }           = require('../config'),
    css         = require('./css'),
    getImage    = require('../images/index');

require('./index.styl');

class Matrix {
    constructor() {
        let matrix       = document.createElement('div');
        matrix.className = css.matrix._;

        this.elem             = matrix;
        this.x                = 0;
        this.y                = 0;
        this.cells            = {};
        this._lastCurrentCell = null;

        this.setPosition(0, 0);

        root.appendChild(matrix);
    }

    addCell(x, y) {
        let cell          = document.createElement('div');
        cell.className    = `${css.cell._} ${css.cell.loading}`;
        cell.style.height = `${cellH}px`;
        cell.style.width  = `${cellW}px`;
        cell.style.top    = `${cellH * y}px`;
        cell.style.left   = `${cellW * x}px`;

        let image         = document.createElement('img');
        image.className   = css.image._;
        image.src         = getImage(x, y);
        image.onload      = () => cell.classList.remove(css.cell.loading);
        cell.appendChild(image);

        let number        = document.createElement('div');
        number.className  = css.number._;
        number.innerText  = 1 + getImage.getIndex(x, y);
        cell.appendChild(number);

        this.elem.appendChild(cell);
        this.cells[`${x}_${y}`] = cell;
    }

    hasCell(x, y) {
        return Matrix._getCellKey(x, y) in this.cells;
    }

    getCell(x, y) {
        return this.cells[Matrix._getCellKey(x, y)];
    }

    removeCell(x, y) {
        this.elem.removeChild(this.cells[Matrix._getCellKey(x, y)]);
        delete this.cells[Matrix._getCellKey(x, y)];
    }

    lazyLoadCells() {
        let {x1, x2, y1, y2} = this.getViewZone();

        for (let ix = x1; ix <= x2; ++ix) {
            for (let iy = y1; iy <= y2; ++iy) {
                if (! this.hasCell(ix, iy)) {
                    this.addCell(ix, iy);
                }
            }
        }

        this.setCurrentCell();
    }

    gc() {
        let {x1, x2, y1, y2} = this.getViewZone(2);

        for (let key of Object.keys(this.cells)) {
            let [x, y] = key.split('_');

            if (x < x1 || x > x2 || y < y1 || y > y2) {
                this.removeCell(x, y);
            }
        }
    }

    normalize() {
        let tx = 0,
            ty = 0;

        if (this.x < -cX * 2) tx =  cX * 2;
        if (this.x >  cX * 2) tx = -cX * 2;
        if (this.y < -cY * 2) ty =  cY * 2;
        if (this.y >  cY * 2) ty = -cY * 2;

        console.log(tx, ty, this.x, this.y, cX * 2, cY * 2);

        if (tx || ty) {
            console.log('normalize', tx, ty);

            let txCell = tx * cellW,
                tyCell = ty * cellH;

            for (let key of Object.keys(this.cells)) {
                let cell = this.cells[key];

                cell.style.top  = `${parseInt(cell.style.top,  10) - tyCell}px`;
                cell.style.left = `${parseInt(cell.style.left, 10) - txCell}px`;

                let [lx, ly] = key.split('_'),
                    newKey = Matrix._getCellKey(+lx + tx, +ly + ty);

                console.log(key, newKey);

                delete this.cells[key];
                this.cells[newKey] = cell;
            }

            this.x += tx;
            this.y += ty;

            let cloneTransition        = this.elem.style.transition;
            this.elem.style.transition = 'none';
            this.updatePosition();
            //this.elem.style.transition = cloneTransition;
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

        this.setCurrentCell();
        this.normalize();

        setTimeout(() => {
            this.gc();
            this.lazyLoadCells();
        }, 400);

        this.updatePosition();
    }

    updatePosition() {
        this.elem.style.top    = `${(this.y+0.5) * -cellH + Matrix.hh}px`;
        this.elem.style.left   = `${(this.x+0.5) * -cellW + Matrix.hw}px`;
    }

    setCurrentCell() {
        let cell = this.getCell(this.x, this.y);

        if (this._lastCurrentCell === cell) return;

        if (this._lastCurrentCell) {
            this._lastCurrentCell.classList.remove(css.cell.current);
        }

        if (cell) {
            cell.classList.add(css.cell.current);
            this._lastCurrentCell = cell;
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getViewZone(extend = 0) {
        return {
            x1: this.x - Matrix.W_VIEW_SIZE - extend,
            x2: this.x + Matrix.W_VIEW_SIZE + extend,
            y1: this.y - Matrix.H_VIEW_SIZE - extend,
            y2: this.y + Matrix.H_VIEW_SIZE + extend
        }
    }

    static _getCellKey(x, y) {
        return `${x}_${y}`
    }

    static updateViewSize(vSize) {
        Matrix.hw = vSize.half.vw;
        Matrix.hh = vSize.half.vh;
        Matrix.H_VIEW_SIZE = Math.ceil((~~(vSize.vh / cellH)) / 2) + 1;
        Matrix.W_VIEW_SIZE = Math.ceil((~~(vSize.vw / cellW))  / 2) + 1;
    }
}

Matrix.hw = 0;
Matrix.hh = 0;
Matrix.H_VIEW_SIZE = 0;
Matrix.W_VIEW_SIZE = 0;

module.exports = Matrix;