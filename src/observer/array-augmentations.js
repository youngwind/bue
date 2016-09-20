/**
 * Created by youngwind on 16/8/23.
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method) => {
    let original = Array.prototype[method];
    arrayAugmentations[method] = function () {
        let result = original.apply(this, arguments);
        let ob = this.$observer;
        let removed, index;
        switch (method) {
            case 'push':
                break;
            case 'pop':
                removed = [result];
                index = this.length;
                break;
            default:
                return;
        }
        ob.notify('set', null, this.length);
    };
});

module.exports = arrayAugmentations;
