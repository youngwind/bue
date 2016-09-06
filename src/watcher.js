/**
 * Created by youngwind on 16/9/5.
 */

import Binding from './binding';


function Watcher(vm, expression, cb, ctx, el, attr) {
    this.vm = vm;
    this.expression = expression;
    this.cb = cb;
    this.ctx = ctx || vm;
    
    this.initDeps(expression);
}


Watcher.prototype.initDeps = function (path) {
    let vm = this.vm;
    let binding = vm._createBindingAt(path);
    binding._addSub(this);
};

Watcher.prototype.update = function () {
    this.cb.call(this.ctx, arguments);
};

module.exports = Watcher;