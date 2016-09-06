/**
 * Created by youngwind on 16/9/5.
 */

function Binding() {
    this._subs = [];
}

Binding.prototype._addChild = function (key, child) {
    child = child || new Binding();
    this[key] = child;
    return child;
};

Binding.prototype._addSub = function (sub) {
    this._subs.push(sub);
};

module.exports = Binding;
