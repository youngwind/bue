/**
 * Created by youngwind on 16/9/18.
 */

import _ from '../util';

/**
 * 绑定事件
 * @param handler
 */
exports.update = function (handler) {
    if (typeof handler !== 'function') {
        _.warn(`指令v-on:${this.expression}不是一个函数`);
        return;
    }
    this.reset();
    this.handler = handler;
    this.el.addEventListener(this.arg, this.handler);
};

/**
 * 解绑事件
 */
exports.reset = function () {
    if (!this.handler) return;
    this.el.removeEventListener(this.arg, this.handler);
};
