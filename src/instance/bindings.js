/**
 * Created by youngwind on 16/9/1.
 */

exports._updateBindingAt = function () {
    let path = arguments[1];
    this._directives.forEach((directive) => {
        if (directive.expression !== path) return;
        directive.update();
    });
};
