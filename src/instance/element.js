/**
 * Created by youngwind on 16/9/6.
 */

import _ from '../util';

/**
 * 初始化节点
 * @param el {string} selector
 * @private
 */
exports._initElement = function (el) {
    if (typeof el !== 'string') return;
    let selector = el;
    this.$el = el = document.querySelector(el);
    if (!el) {
        _.warn(`Cannot find element: ${selector}`);
    }
};
