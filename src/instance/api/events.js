/**
 * Created by youngwind on 16/10/10.
 */

/**
 * 注册事件及其回调函数到实例上
 * @param event {String} 事件名称
 * @param fn {Function} 事件对应的回调函数
 * @returns {Bue} 实例本身
 */
exports.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    return this;
};

/**
 * 在当前实例中触发指定的事件, 执行对应的回调函数
 * @param event {String} 事件名称
 * @param val {*} 事件所携带的参数
 * @returns {boolean} true代表事件可以继续传播, false代表事件不可继续传播
 */
exports.$emit = function (event, val) {
    let cbs = this._events[event];
    let shouldPropagate = true;
    if (cbs) {
        shouldPropagate = false;
        // 遍历执行事件
        let args = new Array(Array.from(arguments)[1]);
        cbs.forEach((cb) => {
            let res = cb.apply(this, args);
            // 就是这里, 决定了"只有当events事件返回true的时候, 事件才能在触发之后依然继续传播"
            if (res === true) {
                shouldPropagate = true;
            }
        });
    }

    return shouldPropagate;
};

/**
 * 向上冒泡事件, 沿父链传播
 * @param event {String} 事件的名称
 * @param val {*} 事件所携带的参数
 * @returns {Bue} 实例
 */
exports.$dispatch = function (event, val) {
    // 在当前实例中触发该事件
    let shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return this;
    let parent = this.$parent;
    // 遍历父链
    while (parent) {
        shouldPropagate = parent.$emit.apply(parent, arguments);
        parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
};

/**
 * 向下广播事件, 沿子链传播
 * @param event {String} 事件的名称
 * @param val {*} 事件所携带的参数
 * @returns {Bue} 实例
 */
exports.$broadcast = function (event, val) {
    let children = this.$children;
    let shouldPropagate = true;
    children.forEach((child) => {
        shouldPropagate = child.$emit.apply(child, arguments);
        if (shouldPropagate) {
            child.$broadcast.apply(child, arguments);
        }
    });
    return this;
};
