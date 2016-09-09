/**
 * Created by youngwind on 16/9/8.
 */

/**
 * 这个函数比较厉害, 解决了很多地方的问题。
 * 比如说, 给你一个path="user.name",你如何去获取它对应的值呢?
 * 我之前的做法是循环$data对象,然后一层一层往下找
 * 但是这样的做法是低效的。
 * 作者的写法更高明。他创建根据path创建了一个通用的getter函数,
 * 只需要将这个拼接成的getter函数赋值给对象的get属性
 * 那么自然就能读取到该属性值了
 * @param path {String} 路径,如"user.name"
 * @returns {Function} Getter函数
 */
exports.compileGetter = function (path) {
    path = path.split('.');
    let boby = 'if (o !=null';
    let pathString = 'o';
    let key;
    for (let i = 0; i < path.length - 1; i++) {
        key = path[i];
        pathString += `.${key}`;
        boby += ` && ${pathString} != null`;
    }
    key = path[path.length - 1];
    pathString += `.${key}`;
    boby += `) return ${pathString}`;
    return new Function('o', boby);   // eslint-disable-line
};
