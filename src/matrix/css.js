const blockClass = 'b-matrix';

module.exports = {
    matrix : {
        _: blockClass
    },
    cell : {
        _ : `${blockClass}__cell`,
        loading: `${blockClass}__cell_loading`,
        current: `${blockClass}__cell_current`,
    },
    image : {
        _ : `${blockClass}__image`,
    },
    number : {
        _ : `${blockClass}__number`
    }
};

