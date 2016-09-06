/**
 * Created by youngwind on 16/9/6.
 */

import _ from '../util';


exports._initElement = function (el) {
    if (typeof el !== 'string') return;
    let selector = el;
    el = document.querySelector(el);
    if (!el) {
        _.warn(`Cannot find element: ${selector}`);
    }
};
