/**
 * Created by youngwind on 16/9/27.
 */

import _ from '../../util';

exports.bind = function () {
    let el = this.el;
    this.handler = () => {
        this.vm.$set(this.expression, el.value);
    };
    _.on(el, 'input', this.handler);
};

exports.update = function (value) {
    this.el.value = value;
};
