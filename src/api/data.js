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

