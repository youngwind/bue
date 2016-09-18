/**
 * Created by youngwind on 16/9/6.
 */

/**
 * 格式转换(有待扩充)此处原作者代码非常复杂, 有待研究
 * @param s {string} 例如: user.name或者data-id:user.id
 * @returns {Array} [{expression: "user.name"}]
 */
exports.parse = function (s) {
    // 此处缺缓存系统

    let dirs = [];
    if (s.indexOf(':') !== -1) {
        // 属性指令 data-id:user.id
        let ss = s.split(':');
        dirs.push({
            raw: s,
            arg: ss[0],
            expression: ss[1]
        });
    } else {
        // 文本指令  user.name
        dirs.push({
            raw: s,
            expression: s
        });
    }

    return dirs;
};
