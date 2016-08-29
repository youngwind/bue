/**
 * Created by youngwind on 16/8/23.
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method) => {
    let original = Array.prototype[method];
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');
        return original.apply(this, arguments);
    };
});

module.exports = arrayAugmentations;
