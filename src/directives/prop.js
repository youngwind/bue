/**
 * Created by youngwind on 16/10/3.
 */

module.exports = {
    bind: function () {
        // 初始化动态prop
        // this.arg == "name"; this.expression == "user.name", true代表是动态prop
        this.vm.initProp(this.arg, this.expression, true);
    },

    update: function (value) {
        // 设置组件的$data, 此操作会引发数据的notify
        this.vm.$set(this.arg, value);
    }
};
