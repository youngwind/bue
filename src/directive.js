/**
 * Created by youngwind on 16/9/1.
 */

import Watcher from './watcher';
import _ from './util';

/**
 * 指令构造函数
 * @param name {string} 例如:text, 代表是文本节点
 * @param el {Element} 对应的文本节点
 * @param vm {Bue} bue实例
 * @param descriptor {Object} 指令描述符, 描述一个指令, 形如: {expression: "user.name"}
 * @constructor
 */
function Directive(name, el, vm, descriptor) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = descriptor.expression;
    this.attr = 'nodeValue';
    this._initDef();
    this._bind();
}

/**
 * 根据指令表达式实例化watcher, 并且执行directive对应的update函数
 * 为毛要这样呢? 因为如果不这样, 那么初次解析渲染DOM的时候就没法显示真实的数据了呀!
 * 你想啊, 第一次压根没触发数据改变, 怎么会进行各种update呢?
 * 所以只能自己手动update了
 * @private
 */
Directive.prototype._bind = function () {
    if (!this.expression) return;

    this._watcher = new Watcher(
        this.vm,
        this.expression,
        this._update,  // 回调函数,目前是唯一的,就是更新DOM
        this           // 上下文
    );

    this.update();
};

/**
 * 不同指令对应的更新update函数不同, 所以需要分类处理
 * 比如对于文本节点, this.name = 'text', 然后他的update函数就是更新nodeValue
 * 这里有点绕, 实际的函数请参考 /src/directives/text.js
 * @private
 */
Directive.prototype._initDef = function () {
    let def = this.vm.$options.directives[this.name];
    _.extend(this, def);
};

/**
 * 这里就更绕了。意思是: 指令本身的更新函数, 其实是调用它自己的更新函数
 * 为什么要这样处理呢? 首先, 如果数据发生改变的话, 会调用指令的更新函数, 这没有问题
 * 但是,不同的指令类型, 所执行的更新函数是不一样的!这一点跟上面函数_initDef直接相关
 * @private
 */
Directive.prototype._update = function () {
    this.update();
};

module.exports = Directive;
