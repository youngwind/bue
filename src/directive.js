/**
 * Created by youngwind on 16/9/1.
 */

import Watcher from './watcher';
import _ from './util';

function Directive(name, el, vm, descriptor) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = descriptor.expression;
    this.attr = 'nodeValue';
    this._initDef();
    this._bind();

}


Directive.prototype._bind = function () {
    if (!this.expression) return;

    this._watcher = new Watcher(
        this.vm,
        this.expression,
        this._update,  // 回调函数,目前是唯一的,就是更新DOM
        this,           // 上下文
    );
    if (this.update) {
        this.update();
    }
};

Directive.prototype._initDef = function () {
    let def = this.vm.$options.directives[this.name];
    _.extend(this, def);
};

Directive.prototype._update = function () {
    this.update();
};

module.exports = Directive;
