const
    unsplashIt = require('./sources/unsplash.it'),
    placeImg   = require('./sources/placeimg.com'),
    {matrixSize: {height: h, width: w}, cell: {height: cellH, width: cellW}} = require('../config');

function getIndex(x, y) {
    y = y % h;
    x = x % w;

    if (y < 0) y += h;
    if (x < 0) x += w;

    return y * w + x;
}

module.exports = function getImageKeyForPosition(x, y) {
    let key = getIndex(x, y);

    return key % 2 === 0 ?
        unsplashIt(cellH, cellW, key / 2) :
        placeImg(cellH, cellW, ~~(key / 2) + 1)
};

module.exports.getIndex = getIndex;

