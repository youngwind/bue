/**
 * Created by youngwind on 16/8/24.
 */

import Watcher from '../watcher';

/**
 * 这就是 vm.$watch(function(){.....})那里用到的
 * @param exp {String} 指令表达式
 * @param cb {Function} 当指令表达式对应的数据发生改变时执行的回调函数
 */
exports.$watch = function (exp, cb) {
    new Watcher(this, exp, cb, this);
};

/**
 * 设置数据值, 比如 this.vm.$set('user.name', "lianghshaofeng");
 * 等价于 app.$data.user.name = "liangshaofeng"
 * @param exp {String} 比如user.name
 * @param val {*} 数据的值
 */
exports.$set = function (exp, val) {
    let ee = exp.split('.');
    let length = ee.length;
    let data = this.$data;
    for (let i = 0; i < length - 1; i++) {
        let key = ee[i];
        data = data[key];
    }
    data[ee[length - 1]] = val;
};

