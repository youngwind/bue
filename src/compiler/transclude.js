/**
 * Created by youngwind on 16/9/28.
 */

/**
 * 将template模板转化成DOM结构,
 * 举例: '<p>{{user.name}}</p>'  -> 对应的DOM结构
 * @param el {Element} 原有的DOM结构
 * @param options {Object}
 * @returns {DOM}
 */
module.exports = function (el, options) {
    let tpl = options.template;
    if (tpl) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(tpl, 'text/html');
        // 此处生成的doc是一个包含html和body标签的HTMLDocument
        // 想要的DOM结构被包在body标签里面
        // 所以需要进去body标签找出来
        return doc.querySelector('body').firstChild;
    } else {
        return el;
    }
};
