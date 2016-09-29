/**
 * Created by youngwind on 16/9/28.
 */

import _ from '../util';
import config from '../config';

module.exports = {
    bind: function () {
        if (!this.el.__vue__) {
            // 判断该组件是否已经被挂载
            this.anchor = document.createComment(`${config.prefix}component`);
            _.replace(this.el, this.anchor);
            this.setComponent(this.expression);
        }
    },

    update: function () {

    },

    /**
     * @param value {String} 组件标签名, 如 "my-component"
     */
    setComponent: function (value) {
        if (value) {
            this.Component = this.vm.$options.components[value];
            this.ComponentName = value;
            this.mountComponent();
        }
    },

    /**
     * 构建、挂载组件实例
     */
    mountComponent: function () {
        let newComponent = this.build();
        newComponent.$before(this.anchor);
    },

    /**
     * 构建组件实例
     * @returns {BueComponent}
     */
    build: function () {
        if (this.Component) {
            let options = {
                name: this.ComponentName,
                el: this.el.cloneNode(),
                parent: this.vm,
                isComponent: true
            };
            let child = new this.Component(options);
            return child;
        }
    }
};
