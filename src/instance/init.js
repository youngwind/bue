/**
 * Created by youngwind on 16/8/18.
 * 实例初始化
 */

exports._init = function (options) {
    // 其他初始化

    this.$data = options.data;
    this.$el = document.querySelector(options.el);

    this.$mount();
};
