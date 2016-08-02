module.exports = function getUrl(height, width, key) {
    return `http://unsplash.it/${width}/${height}/?image=${key}`;
};