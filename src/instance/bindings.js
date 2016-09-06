/**
 * Created by youngwind on 16/9/1.
 */

import Binding from '../binding';

/**
 * 这个函数很重要。当数据方法改变时, 执行的就是它了。
 * 它会去把对应改变了的数据那里找出所有的watcher, 然后一一执行他们的cb
 * 一个都不放过
 * @private
 */
exports._updateBindingAt = function () {
    let path = arguments[1];
    let pathAry = path.split('.');
    let r = this._rootBinding;
    pathAry.forEach((key) => {
        r = r[key];
    });
    let subs = r._subs;
    subs.forEach((watcher) => {
        watcher.cb.call(watcher);
    });
};

/**
 * 就是在这里定于数据对象的变化的
 * @private
 */
exports._initBindings = function () {
    this._rootBinding = new Binding();
    this.observer.on('set', this._updateBindingAt.bind(this));
};

/**
 * 根据给出的路径创建binding
 * @param path {String} 例如: "user.name"
 * @returns {Binding}
 * @private
 */
exports._createBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');

    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        b = b[key] = b._addChild(key);
    }
    return b;
};
