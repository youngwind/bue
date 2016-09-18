/**
 * Created by youngwind on 16/9/6.
 */

const tagRE = /\{?\{\{(.+?)\}\}\}?/g;

/**
 * 将文本节点如"{{user.name}}1111",解析成["user.name","1111"]两个节点
 * @param text {String} 例如 "{{user.name}}1111"
 */
exports.parse = function (text) {
    if (text.trim() === '' || !tagRE.test(text)) return null;
    let tokens = [],
        match, index, value, lastIndex = 0;
    tagRE.lastIndex = 0;
    while (match = tagRE.exec(text)) {
        index = match.index;
        if (index > lastIndex) {
            tokens.push({
                value: text.slice(lastIndex, index)
            });
        }
        index = match.index;
        value = match[1];
        tokens.push({
            tag: true,
            value: value.trim()
        });
        lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length - 1) {
        tokens.push({
            value: text.slice(lastIndex)
        });
    }
    return tokens;
};
