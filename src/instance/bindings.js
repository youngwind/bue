/**
 * Created by youngwind on 16/9/1.
 */

import Binding from '../binding';

exports._updateBindingAt = function () {
    let path = arguments[1];
    let subs = this._rootBinding[path]._subs;
    subs.forEach((watcher) => {
        watcher.cb.call(watcher);
    });
};

exports._initBindings = function () {
    let root = this._rootBinding = new Binding();
};

exports._createBindingAt = function (path) {
    let b = this._rootBinding;
    let child;
    child = b._addChild(path);
    b = child;
    return b;
};
