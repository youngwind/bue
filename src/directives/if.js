/**
 * Created by youngwind on 16/9/11.
 * 处理 "v-if" 这样的指令
 */
import _ from '../util';
import config from '../config';

/**
 * 此函数在初次解析v-if节点的时候执行
 * 作用是用一个注释节点占据原先的v-if节点位置
 * (其实就差不多相当于:对于文本节点,就用一个空的文本节点代替他一样。
 */
exports.bind = function () {
    let el = this.el;
    this.ref = document.createComment(`${config.prefix}-if`);
    _.after(this.ref, el);
    _.remove(el);
    this.inserted = false;
};

/**
 * 当v-if指令依赖的数据发生变化时触发此更新函数
 * @param value {Boolean} true/false 表示显示还是不显示该节点
 */
exports.update = function (value) {
    if (value) {
        // 挂载子实例
        if (!this.inserted) {
            if (!this.childBM) {
                this.build();
            }
            this.childBM.$before(this.ref);
            this.inserted = true;
        }
    } else {
        // 卸载子实例
        if (this.inserted) {
            this.childBM.$remove();
            this.inserted = false;
        }
    }
};

/**
 * 这个build比较吊
 * 因为对于一个 "v-if" 结构来说, 远比一个普通的文本节点要复杂。
 * 所以对弈v-if节点不能当成普通的节点来处理, 它更像是一个子的vue实例
 * 所以我们将整个v-if节点当成是另外一个vue实例, 然后实例化它
 */
exports.build = function () {
    this.childBM = new _.Bue({
        el: this.el
    });
};
