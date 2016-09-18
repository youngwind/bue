/**
 * Created by youngwind on 16/9/18.
 */

exports.update = function (value) {
    let name = this.arg;
    let el = this.el;
    el.setAttribute(name, value);
};
