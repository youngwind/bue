/**
 * Created by youngwind on 16/8/23.
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop'];
const arrayAugmentations = Object.create(Array.prototype);


aryMethods.forEach((method)=> {
    let original = Array.prototype[method];
    Object.defineProperty(arrayAugmentations, method, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function () {
            let result = original.apply(this, arguments);
            let ob = this.$observer;

            ob.trigger.call(ob, 'set');
            // console.log('我被改变啦!');

            return result;
        }
    });

});

module.exports = arrayAugmentations;