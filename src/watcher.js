/**
 * Created by youngwind on 16/9/5.
 */


function Watcher(vm, expression, cb,ctx, el, attr) {
    this.vm = vm;
    this.expression = expression;
    this.cb = cb;
    this.ctx = ctx || vm;

    // 糟糕的设计!!
    this.el = el;
    this.attr = attr;

    this.initDeps(expression);
}

Watcher.prototype.initDeps = function (path) {
    this.addDep(path);
};

Watcher.prototype.addDep = function (path) {
    let vm = this.vm;
    let binding = vm._createBindingAt(path);
    binding._addSub(this);
};

module.exports = Watcher;