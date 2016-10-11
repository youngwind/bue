/**
 * Created by youngwind on 16/10/10.
 */

/**
 * 初始化事件events
 * @private
 */
exports._initEvents = function () {
    let options = this.$options;
    registerCallbacks(this, '$on', options.events);
};

/**
 * 遍历实例的所有事件
 * @param vm {Bue} bue实例
 * @param action {String} 动作类型,此处为'$on',代表绑定事件
 * @param events {Object} 事件对象,可能包含多个事件, 所以需要遍历
 */
function registerCallbacks(vm, action, events) {
    if (!events) return;
    for (let key in events) {
        let event = events[key];
        register(vm, action, key, event);
    }
}

/**
 * 注册单个事件
 * @param vm {Bue} bue实例
 * @param action {String} 动作类型,此处为'$on',代表绑定事件
 * @param key {String} 事件名称, 比如: 'parent-name',代表从父组件那里传递了名称过来
 * @param event {Function} 触发key事件的时候, 对应的回调函数
 */
function register(vm, action, key, event) {
    if (typeof event !== 'function') return;
    vm[action](key, event);
}
