/**
 * Created by youngwind on 16/9/1.
 */

import Watcher from './watcher';

function Directive(name, el, vm, descriptor) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = descriptor.expression;
    this.attr = 'nodeValue';
    this._bind();
}


Directive.prototype._bind = function () {
    if (!this.expression) return;

    this._watcher = new Watcher(
        this.vm,
        this.expression,
        this._update,  // 回调函数,目前是唯一的,就是更新DOM
        this,           // 上下文

        // 糟糕的设计!!
        this.el,
        this.attr
    );
    if (this._update) {
        this._update();
    }
};

// TODO 此处有问题。因为并不是每一个指令的update操作都是这样的,只有更新textNode才是这样子的, 所以之后还需要处理诸如HTML个update等
// TODO 另外一个问题, 关于如何根据属性键获取属性值,应该单独抽象函数, 不应该写在这儿, 但是我还没想好怎么写
Directive.prototype._update = function () {
    let properties = this.expression.split('.');
    let value = this.vm.$data;
    properties.forEach((property) => {
        value = value[property];
    });
    this.el[this.attr] = value;
    console.log(`更新了DOM-${this.expression}`,this.el);
};

module.exports = Directive;
