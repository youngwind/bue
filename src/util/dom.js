/**
 * Created by youngwind on 16/9/6.
 */

import config from '../config';

/**
 * insertBefore
 * @param el {Element}
 * @param target {Element}
 */
exports.before = function (el, target) {
    target.parentNode.insertBefore(el, target);
};

/**
 * 因为没有原声的insertAfter方法, 所以需要迂回处理一下
 * @param el
 * @param target
 */
exports.after = function (el, target) {
    if (target.nextSibling) {
        exports.before(el, target.nextSibling);
    } else {
        target.parentNode.appendChild(el);
    }
};

/**
 * removeSelf
 * @param el {Element}
 */
exports.remove = function (el) {
    el.parentNode.removeChild(el);
};

/**
 * 用新的节点代替旧的节点
 * @param target {Element} 旧节点
 * @param el {Element} 新节点
 */
exports.replace = function (target, el) {
    let parent = target.parentNode;
    parent.insertBefore(el, target);
    parent.removeChild(target);
};

/**
 * 把node节点的attr取出来(并且移除该attr)
 * 注意! 这里会把该attr移除! 专门用来处理v-if这样的属性
 * @param node {Element}
 * @param attr {String}
 * @returns {string}
 */
exports.attr = function (node, attr) {
    attr = config.prefix + attr;
    let val = node.getAttribute(attr);
    if (val) {
        node.removeAttribute(attr);
    }
    return val;
};
