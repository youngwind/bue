/**
 * Created by youngwind on 16/9/1.
 */

import Binding from '../binding';

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

exports._initBindings = function () {
    let root = this._rootBinding = new Binding();
};

/**
 *
 * @param path
 * @returns {Binding|*}
 * @private
 */
exports._createBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');

    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        b = b[key]= b._addChild(key);
    }
    return b;
};
