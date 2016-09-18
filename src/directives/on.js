/**
 * Created by youngwind on 16/9/18.
 */

import _ from '../util';

exports.update = function (handler) {
    if (typeof handler !== 'function') {
        _.warn(`指令v-on:${this.expression}不是一个函数`);
        return;
    }
    this.el.addEventListener(this.arg, handler);
};