/**
 * Created by youngwind on 16/8/18.
 * 实例初始化
 */

exports._init = function (options) {
    // 其他初始化

    this.$options = options;
    this.$options.directives = require('../directives');
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);
    this._directives = [];

    // 创建观察对象
    this.observer = this.observer.create(this.$data);

    this.observer.on('set', this._updateBindingAt.bind(this));

    this._initBindings();

    // 渲染挂载
    if (options.el) {
        this.$mount(options.el);
    }
};
