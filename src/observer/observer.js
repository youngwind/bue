/**
 * Created by youngwind on 16/8/22.
 * 观察对象
 */

import arrayAugmentations from '../observer/array-augmentations';

const ARRAY = 0;
const OBJECT = 1;

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 * @constructor
 */
function Observer(value, type) {
    this.value = value;
    // TODO 这里为什么enumerable一定要为false,否则会触发死循环
    // value.$observer = this;
    Object.defineProperty(value, '$observer', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    });
    if (type === ARRAY) {
        value.__proto__ = arrayAugmentations;
        this.link(value);
    } else if (type === OBJECT) {
        this.walk(value);
    }
}

/**
 * 遍历数据对象
 * @param obj {Object} 待遍历的数据对象
 */
Observer.prototype.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) return;

        val = obj[key];

        // 递归
        this.observe(key, val);

        this.convert(key, val);

    }
};


/**
 * 定义对象属性
 * @param key {string} 属性键名
 * @param val {Any} 属性值
 */
Observer.prototype.convert = function (key, val) {
    let ob = this;
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val
        },
        set: function (newVal) {
            if (newVal === val) return;
            val = newVal
            console.log('你设置了' + key + ' 新的' + key + ' = ' + newVal);
            // ob.trigger.call(ob, 'set');
            ob.notify('set', key, newVal);
            ob.notify(`set:${key}`, key, newVal)
        }
    })
};


Observer.prototype.observe = function (key, val) {
    let ob = Observer.create(val);
    if (!ob) return;
    ob.parent = {
        key,
        ob: this
    }

};

Observer.prototype.link = function () {

};

/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 对调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function (event, fn) {
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = []
    }
    this._cbs[event].push(fn);

    // 级联调用
    return this;
};

/**
 * 触发消息, 并且将消息逐层往上传播
 */
Observer.prototype.notify = function (event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    if (!parent) return;
    let ob = parent.ob;
    ob.notify(event, path, val);
};

/**
 * 触发执行回调函数
 */
Observer.prototype.emit = function (event, path, val) {
    this._cbs = this._cbs || {};
    let callbacks = this._cbs[event]

    if (!callbacks) return;

    callbacks = callbacks.slice(0);
    callbacks.forEach((cb, i) => {
        callbacks[i].apply(this, arguments)
    });
};

Observer.create = function (value, options) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }
};

module.exports = Observer;