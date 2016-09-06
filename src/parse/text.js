/**
 * Created by youngwind on 16/9/6.
 */

/**
 * 将文本节点如"{{user.name}}1111",解析成["{{user.name}}","1111"]两个节点
 * @param text
 */
exports.parse = function (text) {
    let tokens = [];
    let tagRE = /\{?\{\{(.+?)\}\}\}?/g;
    let match, index, value, lastIndex = 0;
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