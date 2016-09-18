/**
 * Created by youngwind on 16/9/6.
 */

exports.bind = function () {
};

/**
 * 这个就是textNode对应的更新函数啦
 */
exports.update = function (value) {
    this.el['nodeValue'] = value;
    console.log(`更新了DOM-${this.expression}`, value);
};
