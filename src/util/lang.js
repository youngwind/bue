/**
 * Created by youngwind on 16/8/30.
 */

/**
 * 定义对象属性
 * @param obj {Object} 对象
 * @param key {String} 键值
 * @param val {*} 属性值
 * @param enumerable {Boolean} 是否可枚举
 */
exports.define = function (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
};

/**
 * 这不需要多加解释吧
 * @param to
 * @param from
 */
exports.extend = function (to, from) {
    for (let key in from) {
        to[key] = from[key];
    }
};

/**
 * 代理属性
 * @param to {Object} 目标对象
 * @param from {Object} 当前对象
 * @param key {String} 键值
 */
exports.proxy = function (to, from, key) {
    if (to.hasOwnProperty(key)) return;
    Object.defineProperty(to, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return from[key];
        },
        set: function (val) {
            from[key] = val;
        }
    });
};
