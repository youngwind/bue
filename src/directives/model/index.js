/**
 * Created by youngwind on 16/9/27.
 */

import _ from '../../util';

const handlers = {
    text: require('./text')
};

module.exports = {
    bind: function () {
        let el = this.el;
        let tag = el.tagName;
        let handler;
        if (tag === 'INPUT') {
            handler = handlers.text;
        } else {
            _.warn(`v-model doesn't support element type: ${tag}`);
            return;
        }
        handler.bind.call(this);
        this.update = handler.update;
        this.unbind = handler.unbind;
    }
};
