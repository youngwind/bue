/**
 * Created by youngwind on 16/9/6.
 */

exports.before = function (el, target) {
  target.parentNode.insertBefore(el, target);
};

exports.remove = function (el) {
  el.parentNode.removeChild(el);
};