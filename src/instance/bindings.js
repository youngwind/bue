/**
 * Created by youngwind on 16/9/1.
 */

import Binding from '../binding';

/**
 * 这个函数很重要。当数据方法改变时, 执行的就是它了。
 * 它分为两部分,
 * 先更新本实例所有相关的binding
 * 然后再更新本实例所有子实例的相关binding
 * 它会去把对应改变了的数据那里找出所有的watcher, 然后一一执行他们的cb
 * 一个都不放过
 * @private
 */
exports._updateBindingAt = function () {
    this._updateSelfBindingAt(...arguments);
    this._updateChildrenBindingAt(...arguments);
};

/**
 * 执行本实例发生了数据变动的watcher
 * @param event {String} 事件类型
 * @param path {String} 事件路径
 * @private
 */
exports._updateSelfBindingAt = function (event, path) {
    let pathAry = path.split('.');
    // TODO 此处代码有待优化,可以改成new Function
    let r = this._rootBinding;
    for (let i = 0, l = pathAry.length; i < l; i++) {
        let key = pathAry[i];
        r = r[key];
        if (!r) return;
    }
    let subs = r._subs;
    subs.forEach((watcher) => {
        watcher.cb();
    });
};

/**
 * 执行本实例所有子实例发生了数据变动的watcher
 * @private
 */
exports._updateChildrenBindingAt = function () {
    if (!this.$children.length) return;
    this.$children.forEach((child) => {
        if (child.$options.isComponent) return;
        child._updateBindingAt(...arguments);
    });
};

/**
 * 就是在这里定于数据对象的变化的
 * @private
 */
exports._initBindings = function () {
    this._rootBinding = new Binding();

    this.observer.on('set', this._updateBindingAt.bind(this))
        .on('get', this._collectDep.bind(this));
};

/**
 * 根据给出的路径获取binding
 * 如果有,则返回该binding;如果没有,则返回false
 * @param path {String} 例如: "user.name"
 * @returns {boolean|Binding}
 * @private
 */
exports._getBindingAt = function (path) {
    let b = this._rootBinding;
    let pathAry = path.split('.');
    for (let i = 0; i < pathAry.length; i++) {
        let key = pathAry[i];
        b = b[key];
        if (!b) return false;
    }
    return b;
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

/**
 * 收集依赖。
 * 为什么需要这个东西呢?
 * 因为在实现computed计算属性功能的过程中,
 * 发现程序需要知晓计算出来的属性到底依赖于哪些原先就有的属性
 * 这样才能做到在对应原有的属性的_subs数组中添加新属性指令的watcher事件
 * @param path {String} get事件传播到顶层时的路径,比如"user.name"
 * @private
 */
exports._collectDep = function (event, path) {
    let watcher = this._activeWatcher;
    if (watcher) {
        watcher.addDep(path);
    }
};
