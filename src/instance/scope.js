/**
 * Created by youngwind on 16/9/6.
 */

import Observer from '../observer/observer';

/**
 * 初始化观察独享
 * @param data {Object} 就是那个大的对象啦
 * @private
 */
exports._initData = function (data) {
    this.observer = Observer.create(data);
};

/**
 * 初始化所有计算属性
 * 主要完成一个功能:将计算属性定义的function当成是该属性的getter函数
 * @private
 */
exports._initComputed = function () {
    let computed = this.$options.computed;
    if (!computed) return;
    for (let key in computed) {
        let def = computed[key];
        if (typeof def === 'function') {
            def = {
                get: def
            };
            def.enumerable = true;
            def.configurable = true;
            Object.defineProperty(this.$data, key, def);
        }
    }
};
