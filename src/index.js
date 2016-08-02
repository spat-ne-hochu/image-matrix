const
    Matrix   = require('./matrix/index'),
    viewport = require('./viewport/index'),
    control  = require('./control/index');

Matrix.updateViewSize(viewport.getCurrent());

let matrix = new Matrix(0, 0);

control.addListener((delta) => {
    matrix.setPosition(
        matrix.getX() + delta.x,
        matrix.getY() + delta.y
    );
});

viewport.addListener((vSize) => {
    Matrix.updateViewSize(vSize);
    matrix.updatePosition();
});

