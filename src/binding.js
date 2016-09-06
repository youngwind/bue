/**
 * Created by youngwind on 16/9/5.
 */

function Binding() {
    this._subs = [];
}

/**
 * Add a child binding to the tree.
 * @param key
 * @param child
 * @returns {*|Binding}
 * @private
 */
Binding.prototype._addChild = function (key) {
    return this[key] || new Binding();
};

Binding.prototype._addSub = function (sub) {
    this._subs.push(sub);
};

module.exports = Binding;
