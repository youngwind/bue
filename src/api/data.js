/**
 * Created by youngwind on 16/8/24.
 */


exports.$watch = function (key, fn) {
    let _fn = function () {
        fn(arguments[2]);
    };
    this.$data.$observer.on(`set:${key}`, _fn.bind(this))
};
