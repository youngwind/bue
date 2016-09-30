/**
 * Created by youngwind on 16/9/28.
 */

import _ from './util';

module.exports = function (Bue) {
    /**
     * 组件构造器
     * 返回组件构造函数
     * @param extendOptions {Object} 组件参数
     * @returns {BueComponent}
     */
    Bue.extend = function (extendOptions) {
        let Super = this;
        extendOptions = extendOptions || {};
        let Sub = createClass();
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = _.mergeOptions(Super.options, extendOptions);
        return Sub;
    };

    /**
     * 构造组件构造函数本身
     * 为什么不能直接定义BueComponent,而要每声明一个组件,都new一个构造函数呢?
     * 因为在extend函数中,我们把options当做BueComponent的自定义属性,
     * 那么就意味着如果我们一直使用同一个构造函数的话, 那么所有组件最终的options都会是一样的
     * 这显然不妥
     * @returns {Function}
     */
    function createClass() {
        return new Function('return function BueComponent(options){ this._init(options)}')();  // eslint-disable-line
    }

    /**
     * 注册组件
     * vue的组件使用方式与React不同。React构建出来的组件名可以直接在jsx中使用
     * 当时vue不是。vue的组件在构建之后还需要注册与之相对应的DOM标签
     * @param id {String}, 比如 'my-component'
     * @param definition {BueComponent} 比如 MyComponent
     * @returns {*}
     */
    Bue.component = function (id, definition) {
        this.options.components[id] = definition;
        return definition;
    };
};
