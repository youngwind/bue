/**
 * Created by youngwind on 16/8/18.
 * 实例初始化
 */

exports._init = function (options) {
    // 其他初始化

    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);

    // 创建观察对象
    this.observer = this.observer.create(this.$data);

    this.observer.on('set',this.$mount.bind(this));

    // 渲染挂载
    this.$mount();
};
