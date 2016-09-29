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
        var doc = parser.parseFromString(tpl, 'application/xml');
        // 此处生成的doc是一个fragment, 不能直接返回处理
        // 目前只处理了template有唯一根节点的情况, 所以返回firstChild
        // 对于DOM片段的情况, 暂未处理
        return doc.firstChild;
    } else {
        return el;
    }
};
